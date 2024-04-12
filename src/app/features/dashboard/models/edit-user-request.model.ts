export interface EditUserRequest {
    firstName: string
    lastName: string
    email: string
    phone: string
    roleId: string
    username: string
    password: string
    permissions: Permission[]
}
  
export interface Permission {
    permissionId: string
    isReadable: boolean
    isWritable: boolean
    isDeletable: boolean
}