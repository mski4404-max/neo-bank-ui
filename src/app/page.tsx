"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  CreditCard,
  ShieldCheck,
  Gift,
  Zap,
  Banknote,
  PiggyBank,
  Wallet,
  ArrowRight,
  Activity,
  Star
} from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadialBarChart,
  RadialBar
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Fake data
const balanceSeries = [
  { t: "Mon", v: 14520 },
  { t: "Tue", v: 15240 },
  { t: "Wed", v: 15110 },
  { t: "Thu", v: 15980 },
  { t: "Fri", v: 16225 },
  { t: "Sat", v: 16370 },
  { t: "Sun", v: 16890 }
]

const levelProgress = 68 // XP % progress toward next tier

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto grid gap-6">
        <Header />
        <Kpis />
        <MainPanels />
        <LowerGrid />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Orion - Business Banking</h1>
        <p className="text-slate-400">BNPL + Supply Chain Finance built-in. Gamified, but responsible.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button className="rounded-2xl px-4" variant="secondary">
          <ShieldCheck className="w-4 h-4 mr-2" /> KYC Verified
        </Button>
        <Button className="rounded-2xl px-4">
          <Zap className="w-4 h-4 mr-2" /> New Transfer
        </Button>
      </div>
    </div>
  )
}

function Kpis() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <KpiCard icon={<Wallet className="w-5 h-5" />} label="Available Balance" value="$168,900" sub="+4.4% wk" />
      <KpiCard icon={<CreditCard className="w-5 h-5" />} label="BNPL Utilization" value="$42,000 / $120k" sub="Next payment: Sep 20" />
      <KpiCard icon={<Banknote className="w-5 h-5" />} label="SCF Drawn" value="$310,000 / $500k" sub="Rate: SOFR + 275 bps" />
      <KpiCard icon={<Gift className="w-5 h-5" />} label="Rewards Level" value="Level 4 - 1,360 XP" sub={`${levelProgress}% to L5`} />
    </div>
  )
}

function KpiCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <Card className="bg-slate-900/70 border-slate-800 rounded-2xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">{icon}<span className="text-sm">{label}</span></div>
          <ArrowRight className="w-4 h-4 text-slate-500" />
        </div>
        <div className="mt-2 text-xl font-semibold">{value}</div>
        <div className="text-xs text-slate-400 mt-1">{sub}</div>
      </CardContent>
    </Card>
  )
}

function MainPanels() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="bg-slate-900/70 border-slate-800 rounded-2xl lg:col-span-2">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Cash Flow This Week</h3>
            <span className="text-slate-400 text-sm">All accounts</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={balanceSeries}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                <XAxis dataKey="t" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid #172033", color: "#e2e8f0" }} />
                <Area type="monotone" dataKey="v" stroke="#22d3ee" fill="url(#g)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/70 border-slate-800 rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Level & Rewards</h3>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-28 h-28">
              <ResponsiveContainer>
                <RadialBarChart
                  innerRadius="60%"
                  outerRadius="100%"
                  data={[{ name: "XP", value: levelProgress }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar minAngle={15} dataKey="value" cornerRadius={8} fill="#38bdf8" clockWise/>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-2xl font-semibold">{levelProgress}%</div>
              <div className="text-slate-400 text-sm">to Level 5 - Unlock 0.25% SCF discount</div>
              <div className="mt-3 flex gap-2 flex-wrap">
                <Badge>Daily login streak +10 XP</Badge>
                <Badge>On-time BNPL +50 XP</Badge>
                <Badge>Invite vendor +30 XP</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LowerGrid() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card className="bg-slate-900/70 border-slate-800 rounded-2xl xl:col-span-2">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">BNPL Offers</h3>
            <Button size="sm" className="rounded-2xl">View all</Button>
          </div>
          <OfferRow vendor="Acme Components" apr="9.99%" limit="$80,000" term="4 x 30d" score={92} />
          <OfferRow vendor="Nova Logistics" apr="7.49%" limit="$45,000" term="3 x 30d" score={88} />
          <OfferRow vendor="Helios Plastics" apr="11.25%" limit="$120,000" term="6 x 30d" score={83} />
        </CardContent>
      </Card>

      <Card className="bg-slate-900/70 border-slate-800 rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Activity</h3>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
          <FeedItem icon={<TrendingUp className="w-4 h-4" />} title="Payout received" sub="$14,200 - Stripe" />
          <FeedItem icon={<PiggyBank className="w-4 h-4" />} title="Goal funded" sub="$2,000 -> Payroll buffer" />
          <FeedItem icon={<CreditCard className="w-4 h-4" />} title="BNPL installment paid" sub="Acme - $10,000" />
          <FeedItem icon={<ShieldCheck className="w-4 h-4" />} title="Compliance updated" sub="KYB refresh complete" />
        </CardContent>
      </Card>
    </div>
  )
}

function OfferRow({ vendor, apr, limit, term, score }: { vendor: string, apr: string, limit: string, term: string, score: number }) {
  return (
    <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 grid place-items-center"><CreditCard className="w-5 h-5"/></div>
        <div>
          <div className="font-medium">{vendor}</div>
          <div className="text-xs text-slate-400">Limit {limit} - {term}</div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-3 text-sm text-slate-300">
        <span>APR {apr}</span>
        <span className="text-slate-500">|</span>
        <span>Score {score}</span>
      </div>
      <Button size="sm" className="rounded-2xl">Review</Button>
    </div>
  )
}

function FeedItem({ icon, title, sub }: { icon: React.ReactNode, title: string, sub: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-slate-800/70 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-slate-800 grid place-items-center">{icon}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-slate-400">{sub}</div>
      </div>
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded-full border border-slate-700">
      {children}
    </span>
  )
}
