'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import UVChart from './components/UVChart'

interface HourlyAPIResponse {
  formattedData: { value: number; timestamp: string }[]
  channelInfo: { name: string; description?: string }
}

interface SensorData {
  averageValue: number
  lastTimestamp: string
}

interface ChannelInfo {
  name: string
  description: string
}

interface APIResponse {
  sensorData: SensorData
  channelInfo: ChannelInfo
}

const getUVLevelColor = (uvIndex: number) => {
  if (uvIndex <= 2) return 'bg-green-500'
  if (uvIndex <= 5) return 'bg-yellow-500'
  if (uvIndex <= 7) return 'bg-orange-500'
  if (uvIndex <= 10) return 'bg-red-500'
  return 'bg-purple-500'
}

const getUVLevelText = (uvIndex: number) => {
  if (uvIndex <= 2) return 'Baixo'
  if (uvIndex <= 5) return 'Moderado'
  if (uvIndex <= 7) return 'Alto'
  if (uvIndex <= 10) return 'Muito Alto'
  return 'Extremo'
}

function Loading() {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Carregando dados UV...</p>
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center py-8">
      <p className="text-red-500">{message}</p>
    </div>
  )
}

function ProtectionTips() {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-medium mb-2">Dicas de Proteção</h3>
      <ul className="text-sm text-gray-600 space-y-2">
        <li>✓ Use protetor solar com FPS adequado</li>
        <li>✓ Vista roupas de proteção</li>
        <li>✓ Procure sombra nos horários de pico</li>
        <li>✓ Use óculos escuros e chapéu</li>
      </ul>
    </div>
  )
}

function UVInfo({ uvData }: { uvData: SensorData }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-6">Índice UV Atual</h2>
      <div className="flex justify-center mb-8">
        <div className={`${getUVLevelColor(uvData.averageValue)} rounded-full w-32 h-32 flex items-center justify-center`}>
          <span className="text-4xl font-bold text-white">
            {uvData.averageValue.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-xl font-medium">
          Nível UV: {getUVLevelText(uvData.averageValue)}
        </p>
        <p className="text-gray-500 text-sm">
          Última atualização: {new Date(uvData.lastTimestamp).toLocaleString('pt-BR')}
        </p>
      </div>
      <ProtectionTips />
    </div>
  )
}

export default function Home() {
  const [uvData, setUvData] = useState<SensorData | null>(null)
  const [hourlyData, setHourlyData] = useState<{ value: number; timestamp: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUVData()
    fetchHourlyData()
    const interval = setInterval(() => {
      fetchUVData()
      fetchHourlyData()
    }, 600000) // 600000 ms = 10 minutos
    return () => clearInterval(interval)
  }, [])

  const fetchHourlyData = async () => {
    try {
      const response = await fetch('http://localhost:3333/sensor-data/hourly')
      const data: HourlyAPIResponse = await response.json()
      if (!response.ok || !data.formattedData) {
        throw new Error('Erro ao buscar dados UV')
      }
      setHourlyData(data.formattedData)
    } catch (err) {
      setError('Falha ao buscar dados UV')
      setLoading(false)
    }
  }

  const fetchUVData = async () => {
    try {
      const response = await fetch('http://localhost:3333/sensor-data')
      const data: APIResponse = await response.json()
      if (!response.ok || !data.sensorData) {
        throw new Error('Erro ao buscar dados UV')
      }
      setUvData(data.sensorData)
      setLoading(false)
    } catch (err) {
      setError('Falha ao buscar dados UV')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Logo UVBuddy"
            width={200}
            height={80}
            priority
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          {loading && <Loading />}
          {error && <ErrorMessage message={error} />}
          {uvData && <UVInfo uvData={uvData} />}
          <h3 className="text-lg font-semibold mb-4 mt-8">Gráfico de Indíce UV - ultima hora</h3>
          <UVChart data={hourlyData} />
        </div>
      </div>
    </main>
  )
}