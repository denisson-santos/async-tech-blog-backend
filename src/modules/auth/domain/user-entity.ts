import { Role } from 'src/enums/role';

export class UserEntity {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public avatarUrl?: string | null,
    public bannerUrl?: string | null,
    public bio?: string | null,
    public role: Role = Role.USER,
    public isActive: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt?: Date | null,
  ) {}
}
