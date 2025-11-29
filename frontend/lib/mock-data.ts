/**
 * Mock Data Service
 * 
 * Bu dosya mock-data.json dosyasını okur ve tüm uygulamaya sağlar.
 * mock-data.json dosyası değiştiğinde, bu dosyayı import eden tüm componentler
 * otomatik olarak güncellenir (Next.js hot reload sayesinde).
 */

import mockData from './mock-data.json'

export type MockData = typeof mockData

/**
 * Mock data'yı döndürür
 * Bu fonksiyon mock-data.json dosyasından veriyi okur
 */
export function getMockData(): MockData {
  return mockData
}

/**
 * Belirli bir veri tipini döndürür
 */
export function getUsers() {
  return mockData.users
}

export function getTopics() {
  return mockData.topics
}

export function getComments() {
  return mockData.comments
}

export function getDiscussions() {
  return mockData.discussions
}

export function getEvents() {
  return mockData.events
}

export function getHousing() {
  return mockData.housing
}

export function getHousingReviews() {
  return mockData.housingReviews
}

export function getJobs() {
  return mockData.jobs
}

export function getInternships() {
  return mockData.internships
}

export function getScholarships() {
  return mockData.scholarships
}

export function getVenues() {
  return mockData.venues
}

export function getVenueReviews() {
  return mockData.venueReviews
}

export function getDiscoveryPlaces() {
  return mockData.discoveryPlaces
}

export function getFaqs() {
  return mockData.faqs
}

export function getAcademicResources() {
  return mockData.academicResources
}

export function getAnnouncements() {
  return mockData.announcements
}

export function getLifeGuides() {
  return mockData.lifeGuides
}

export function getContributions() {
  return mockData.contributions
}

export function getAchievements() {
  return mockData.achievements
}

export function getTransactions() {
  return mockData.transactions
}

export function getConversations() {
  return mockData.conversations
}

export function getInvitedUsers() {
  return mockData.invitedUsers
}

export function getWikiEditProposals() {
  return mockData.wikiEditProposals
}

export function getFlaggedContent() {
  return mockData.flaggedContent
}

export function getAdminStats() {
  return mockData.adminStats
}

export function getCoinMatrix() {
  return mockData.coinMatrix
}

export function getConversionConfig() {
  return mockData.conversionConfig
}

export function getTrendingTopics() {
  return mockData.trendingTopics
}

export function getSearchResults() {
  return mockData.searchResults
}

/**
 * ID'ye göre belirli bir kaydı bulur
 */
export function getUserById(id: number) {
  return mockData.users.find(user => user.id === id)
}

export function getTopicById(id: number) {
  return mockData.topics.find(topic => topic.id === id)
}

export function getEventById(id: number) {
  return mockData.events.find(event => event.id === id)
}

export function getHousingById(id: number) {
  return mockData.housing.find(housing => housing.id === id)
}

export function getVenueById(id: number) {
  return mockData.venues.find(venue => venue.id === id)
}

export function getJobById(id: number) {
  return mockData.jobs.find(job => job.id === id)
}

export function getInternshipById(id: number) {
  return mockData.internships.find(internship => internship.id === id)
}

export function getScholarshipById(id: number) {
  return mockData.scholarships.find(scholarship => scholarship.id === id)
}

export function getDiscoveryPlaceById(id: number) {
  return mockData.discoveryPlaces.find(place => place.id === id)
}

export function getFaqById(id: number) {
  return mockData.faqs.find(faq => faq.id === id)
}

export function getAcademicResourceById(id: number) {
  return mockData.academicResources.find(resource => resource.id === id)
}

export function getAnnouncementById(id: number) {
  return mockData.announcements.find(announcement => announcement.id === id)
}

export function getLifeGuideById(id: number) {
  return mockData.lifeGuides.find(guide => guide.id === id)
}

/**
 * İlişkili verileri getirir
 */
export function getCommentsByTopicId(topicId: number) {
  return mockData.comments.filter(comment => comment.topicId === topicId)
}

export function getHousingReviewsByHousingId(housingId: number) {
  return mockData.housingReviews.filter(review => review.housingId === housingId)
}

export function getVenueReviewsByVenueId(venueId: number) {
  return mockData.venueReviews.filter(review => review.venueId === venueId)
}

export function getContributionsByType(type: string) {
  return mockData.contributions.filter(contribution => contribution.type === type)
}

export function getConversationById(id: number) {
  return mockData.conversations.find(conversation => conversation.id === id)
}

// Tüm mock data'yı export et
export default mockData

