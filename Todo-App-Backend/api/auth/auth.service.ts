import CryptoJS from 'crypto-js'
import { createDecoder, createSigner } from 'fast-jwt'
import $prisma from '../../database/init.ts'

// Type definition for permissions
type PermissionObjects = {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}

// Create a session in the database
export const sessionCreate = async (
  userID: string,
  ip: string,
  origin: string,
  accessToken: string,
  refreshToken: string
) => {
  try {
    const tokenLifeTime = Number(process.env.TOKEN_LIFE_TIME) || 60 // Default to 60 minutes if not set
    const newSession = await $prisma.sessions.create({
      data: {
        user_id: userID,
        access_tokens: accessToken,
        refresh_tokens: refreshToken,
        expires: new Date(Date.now() + tokenLifeTime * 60 * 1000),
        ip: ip,
        origin: origin,
      },
    })
    return newSession
  } catch (err: any) {
    console.error('Error creating session:', err)
    return null
  }
}

// Encrypt a password
export const passwordEncrypt = (password: string) => {
  const hash = CryptoJS.AES.encrypt(password, 'login key').toString()
  return hash
}

// Decrypt a password
export const passwordDecrypt = (passwordInDB: string) => {
  const decryptedPassword = CryptoJS.AES.decrypt(passwordInDB, 'login key')
  return decryptedPassword.toString(CryptoJS.enc.Utf8)
}

// Compare a password with the stored encrypted password
export const passwordCompare = (passwordInDB: string, password: string) => {
  const decryptedPassword = CryptoJS.AES.decrypt(passwordInDB, 'login key')
  return decryptedPassword.toString(CryptoJS.enc.Utf8) === password
}

// Generate an access token
export const tokenGenerator = (permissionObject: {
  user: string
  permission: PermissionObjects[]
  expiresTime?: number
}) => {
  const generator = createSigner({ key: 'access_token', algorithm: 'HS256' })
  const token = generator(permissionObject)
  return token
}

// Decode a token
export const tokenDecode = (token: string) => {
  const decoder = createDecoder()
  const decoded = decoder(token)
  return decoded
}

// Generate a refresh token
export const refreshTokenGenerator = async (refreshObject: {
  user: string
  expiresTime?: number
}) => {
  const generator = createSigner({ key: 'refresh_token', algorithm: 'HS256' })
  const token = generator(refreshObject)
  return token
}

// ==================== OAuth Functions ====================

// GitHub OAuth: Exchange code for access token
export const getGithubAccessToken = async (code: string): Promise<string | null> => {
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    })
    const data = await response.json()
    return data.access_token || null
  } catch (err) {
    console.error('Error getting GitHub access token:', err)
    return null
  }
}

// GitHub OAuth: Get user profile
export const getGithubUser = async (
  accessToken: string
): Promise<{ email: string; name: string } | null> => {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    })
    const userData = await response.json()

    // Get user email (may be private)
    let email = userData.email
    if (!email) {
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      })
      const emails = await emailResponse.json()
      const primaryEmail = emails.find((e: any) => e.primary)
      email = primaryEmail?.email || emails[0]?.email
    }

    return {
      email: email,
      name: userData.name || userData.login,
    }
  } catch (err) {
    console.error('Error getting GitHub user:', err)
    return null
  }
}

// Google OAuth: Exchange code for access token
export const getGoogleAccessToken = async (code: string): Promise<string | null> => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${
          process.env.FRONTEND_URL?.replace('5173', '8089') || 'http://localhost:8089'
        }/auth/google/callback`,
      }),
    })
    const data = await response.json()
    return data.access_token || null
  } catch (err) {
    console.error('Error getting Google access token:', err)
    return null
  }
}

// Google OAuth: Get user profile
export const getGoogleUser = async (
  accessToken: string
): Promise<{ email: string; name: string } | null> => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    return {
      email: data.email,
      name: data.name || data.email.split('@')[0],
    }
  } catch (err) {
    console.error('Error getting Google user:', err)
    return null
  }
}

// Find or create OAuth user
export const findOrCreateOAuthUser = async (
  email: string,
  name: string,
  provider: 'github' | 'google'
) => {
  try {
    // Check if user exists
    let user = await $prisma.users.findFirst({
      where: { email: email },
    })

    if (!user) {
      // Get default role
      const role = await $prisma.roles.findFirst({
        where: { name: 'NORMAL_USER' },
      })

      // Create new user (oauth_provider stored via raw SQL if needed)
      user = await $prisma.users.create({
        data: {
          email: email,
          name: name,
          password: '', // OAuth users don't have passwords
          role: role?.id || '',
        },
      })
    }

    return user
  } catch (err) {
    console.error('Error finding/creating OAuth user:', err)
    return null
  }
}
