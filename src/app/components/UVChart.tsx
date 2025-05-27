'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface UVChartProps {
  data: { value: number; timestamp: string }[]
}

export default function UVChart({ data }: UVChartProps) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={t => new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            minTickGap={20}
          />
          <YAxis domain={[0, 'dataMax + 1']} />
          <Tooltip
            labelFormatter={t => new Date(t).toLocaleString('pt-BR')}
            formatter={(value: number) => [`${value.toFixed(2)}`, 'Índice UV']}
          />
          <Line type="monotone" dataKey="value" stroke="#2563eb" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}