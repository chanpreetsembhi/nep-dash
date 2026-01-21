// src/composables/useAuth.ts
import { ref, computed } from 'vue'

const isAdmin = ref(false)

export const useAuth = () => {
  const loginAdmin = () => {
    isAdmin.value = true
    localStorage.setItem('isAdmin', 'true')
  }

  const logoutAdmin = () => {
    isAdmin.value = false
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('adminToken')
  }

  const checkAdmin = () => {
    const admin = localStorage.getItem('isAdmin')
    isAdmin.value = admin === 'true'
  }

  return {
    isAdmin: computed(() => isAdmin.value),
    loginAdmin,
    logoutAdmin,
    checkAdmin,
  }
}
