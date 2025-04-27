'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface SensorData {
  value: number
  timestamp: string
  entryId: number
}

interface ChannelInfo {
  name: string
  description: string
}

interface APIResponse {
  sensorData: SensorData[]
  channelInfo: ChannelInfo
}

export default function Home() {
  const [uvData, setUvData] = useState<SensorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUVData()
  }, [])

  const fetchUVData = async () => {
    try {
      const response = await fetch('http://localhost:3333/sensor-data?results=128')
      const data: APIResponse = await response.json()
      
      // Get the most recent reading
      const latestReading = data.sensorData
        .filter(reading => reading.value > 0) // Filter out zero readings
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
      
      setUvData(latestReading)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch UV data')
      setLoading(false)
    }
  }

  const getUVLevelColor = (uvIndex: number) => {
    if (uvIndex <= 2) return 'bg-green-500'
    if (uvIndex <= 5) return 'bg-yellow-500'
    if (uvIndex <= 7) return 'bg-orange-500'
    if (uvIndex <= 10) return 'bg-red-500'
    return 'bg-purple-500'
  }

  const getUVLevelText = (uvIndex: number) => {
    if (uvIndex <= 2) return 'Low'
    if (uvIndex <= 5) return 'Moderate'
    if (uvIndex <= 7) return 'High'
    if (uvIndex <= 10) return 'Very High'
    return 'Extreme'
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/logo.png"
            alt="UVBuddy Logo"
            width={200}
            height={80}
            priority
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading UV data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {uvData && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">Current UV Index</h2>
              
              <div className="flex justify-center mb-8">
                <div className={`${getUVLevelColor(uvData.value)} rounded-full w-32 h-32 flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-white">
                    {uvData.value.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl font-medium">
                  UV Level: {getUVLevelText(uvData.value)}
                </p>
                <p className="text-gray-500 text-sm">
                  Last updated: {new Date(uvData.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Protection Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Use sunscreen with appropriate SPF</li>
                  <li>✓ Wear protective clothing</li>
                  <li>✓ Seek shade during peak hours</li>
                  <li>✓ Wear sunglasses and a hat</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
