export interface AllUser {
    dataSource: DataSource[]
    page: number
    pageSize: number
    totalCount: number
}

export interface DataSource {
    userId: string
    firstName: string
    lastName: string
    email: string
    role: Role
    username: string
    permissions: Permission[]
    createdDate: string
}
  
export interface Role {
    roleId: string
    roleName: string
}
  
export interface Permission {
    permissionId: string
    permissionName: string
}