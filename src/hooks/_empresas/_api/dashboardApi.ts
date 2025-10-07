import { axiosInstance } from '@/lib/axios'
import type {
  DashboardStats
} from '../_types/dashboardTypes'

// Estatísticas gerais do dashboard
export async function getDashboardStats(): Promise<DashboardStats> {
  const { data } = await axiosInstance.get<DashboardStats>('/admin/empresa/estatisticas')
  return data
}
