'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing Supabase...')
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function testSupabase() {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('products')
        .select('name, price_cents')
        .limit(10)

      if (error) {
        console.error(error)
        setStatus(`ERROR: ${error.message}`)
        return
      }

      setProducts(data || [])
      setStatus(`SUCCESS — Supabase connected. Found ${data?.length || 0} products.`)
    }

    testSupabase()
  }, [])

  return (
    <main style={{ padding: 40 }}>
      <h1>Supabase Test</h1>

      <p>{status}</p>

      {products.map((product) => (
        <div key={product.name}>
          {product.name} — ${((product.price_cents || 0) / 100).toFixed(2)}
        </div>
      ))}
    </main>
  )
}