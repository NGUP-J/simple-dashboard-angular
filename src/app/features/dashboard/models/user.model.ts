export interface User {
  status: Status;
  data: Data;
}

export interface Status {
  code: string;
  description: string;
}

export interface Data {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  username: string;
  permissions: Permission[];
}

export interface Role {
  roleId: string;
  roleName: string;
}

export interface Permission {
  permissionId: string;
  permissionName: string;
  isReadable: boolean;
  isWritable: boolean;
  isDeletable: boolean;
}
