/**
 * API Client with error handling and type safety
 */

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface RequestOptions extends RequestInit {
  method?: RequestMethod
  params?: Record<string, string | number | boolean>
  timeout?: number
}

interface ApiError {
  message: string
  status: number
  data?: unknown
}

class ApiClientError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = "ApiClientError"
    this.status = status
    this.data = data
  }
}

export class ApiClient {
  private baseURL: string
  private defaultTimeout: number

  constructor(baseURL?: string, timeout?: number) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
    this.defaultTimeout = timeout || 30000
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      method = "GET",
      params,
      timeout = this.defaultTimeout,
      headers = {},
      ...fetchOptions
    } = options

    // Build URL with query parameters
    const url = new URL(endpoint, this.baseURL)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal: controller.signal,
        ...fetchOptions,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorData: unknown
        try {
          errorData = await response.json()
        } catch {
          errorData = await response.text()
        }

        throw new ApiClientError(
          `API Error: ${response.statusText}`,
          response.status,
          errorData
        )
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type")
      if (contentType?.includes("application/json")) {
        return await response.json()
      }

      return (await response.text()) as T
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof ApiClientError) {
        throw error
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiClientError("Request timeout", 408)
      }

      throw new ApiClientError(
        error instanceof Error ? error.message : "Unknown error occurred",
        0
      )
    }
  }

  async get<T>(endpoint: string, options?: Omit<RequestOptions, "method">): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: Omit<RequestOptions, "method">): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

// Default API client instance
export const apiClient = new ApiClient()

// Export error class for error handling
export { ApiClientError }
export type { ApiError, RequestOptions }

