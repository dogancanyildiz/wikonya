/**
 * usePermissions Hook - Kullanıcı yetkilerini kolayca kontrol etmek için
 */

import { useApp } from "@/contexts/app-context"
import {
  canCreateTopic,
  canEditWiki,
  canProposeWikiEdit,
  canModerate,
  canApproveProposals,
  canAccessAdminPanel,
  getUserPermissions,
} from "@/lib/gamification/permissions"

export function usePermissions() {
  const { state } = useApp()
  const user = state.user

  return {
    canCreateTopic: canCreateTopic(user),
    canEditWiki: canEditWiki(user),
    canProposeWikiEdit: canProposeWikiEdit(user),
    canModerate: canModerate(user),
    canApproveProposals: canApproveProposals(user),
    canAccessAdminPanel: canAccessAdminPanel(user),
    permissions: getUserPermissions(user),
    isAuthenticated: state.isAuthenticated,
  }
}

