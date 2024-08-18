export default interface IUserVerification {
  id?: number
  otp?: number
  is_revoked?: boolean
  is_expired?: boolean
  expired_at?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string
  user_id?: number
}
