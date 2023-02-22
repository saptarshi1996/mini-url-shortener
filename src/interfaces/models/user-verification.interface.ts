export default interface IUserVerification {
  id?: number
  otp?: number
  is_revoked?: boolean
  is_expired?: boolean
  expires_at?: Date
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date

  user_id?: number
}
