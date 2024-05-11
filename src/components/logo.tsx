'use client'

import { cn } from '@/lib/utils'
import { norican } from './fonts'

const Logo = () => {
  return (
    <div>
      <h1 className={cn('text-4xl', norican.className)}>Instagram</h1>
    </div>
  )
}

export default Logo
