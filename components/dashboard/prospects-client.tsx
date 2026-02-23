"use client"

import { useState } from "react"
import {
  UserPlus,
  Search,
  DollarSign,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Deposit {
  id: string
  amount: number
  status: string
}

interface Prospect {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  message: string | null
  source: string
  status: string
  createdAt: string
  deposits: Deposit[]
}

interface Props {
  initialProspects: Prospect[]
  userId: string
}

const STATUS_LABELS: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  CONVERTED: "Converted",
  LOST: "Lost",
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUALIFIED: "bg-purple-100 text-purple-800",
  CONVERTED: "bg-green-100 text-green-800",
  LOST: "bg-gray-100 text-gray-800",
}

export default function ProspectsClient({ initialProspects, userId }: Props) {
  const [prospects, setProspects] = useState<Prospect[]>(initialProspects)
  const [showAddForm, setShowAddForm] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [depositModal, setDepositModal] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  const filtered = prospects.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalDeposits = prospects.reduce(
    (sum, p) =>
      sum +
      p.deposits
        .filter((d) => d.status === "COMPLETED")
        .reduce((s, d) => s + d.amount, 0),
    0
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Prospects</h2>
          <p className="text-muted-foreground">
            {prospects.length} prospect{prospects.length !== 1 ? "s" : ""} |
            ${(totalDeposits / 100).toLocaleString()} in deposits
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
        >
          <UserPlus className="h-4 w-4" />
          Add Prospect
        </button>
      </div>

      {showAddForm && (
        <AddProspectForm
          userId={userId}
          onClose={() => setShowAddForm(false)}
          onAdded={(prospect) => {
            setProspects([{ ...prospect, deposits: [] }, ...prospects])
            setShowAddForm(false)
          }}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent"
          >
            <option value="">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {prospects.length === 0
                ? 'No prospects yet. Click "Add Prospect" to get started.'
                : "No prospects match your search."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((prospect) => (
            <ProspectRow
              key={prospect.id}
              prospect={prospect}
              showDeposit={depositModal === prospect.id}
              onToggleDeposit={() =>
                setDepositModal(
                  depositModal === prospect.id ? null : prospect.id
                )
              }
              copiedLink={copiedLink}
              onCopiedLink={setCopiedLink}
              onStatusChange={(newStatus) => {
                setProspects(
                  prospects.map((p) =>
                    p.id === prospect.id ? { ...p, status: newStatus } : p
                  )
                )
              }}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function AddProspectForm({
  userId,
  onClose,
  onAdded,
}: {
  userId: string
  onClose: () => void
  onAdded: (prospect: Prospect) => void
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "partner_referral",
          referredById: userId,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to add prospect")
      }

      const data = await res.json()
      onAdded(data.prospect)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Prospect</CardTitle>
        <CardDescription>
          Add a customer prospect to track and collect deposits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="123 Main St, City, CA"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              placeholder="Additional notes about this prospect..."
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Adding...
                </span>
              ) : (
                "Add Prospect"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function ProspectRow({
  prospect,
  showDeposit,
  onToggleDeposit,
  copiedLink,
  onCopiedLink,
  onStatusChange,
  userId,
}: {
  prospect: Prospect
  showDeposit: boolean
  onToggleDeposit: () => void
  copiedLink: string | null
  onCopiedLink: (id: string | null) => void
  onStatusChange: (status: string) => void
  userId: string
}) {
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setUpdatingStatus(true)
    try {
      const res = await fetch(`/api/prospects/${prospect.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        onStatusChange(newStatus)
      }
    } catch {
      // Ignore
    } finally {
      setUpdatingStatus(false)
    }
  }

  const completedDeposits = prospect.deposits.filter(
    (d) => d.status === "COMPLETED"
  )
  const depositTotal = completedDeposits.reduce((s, d) => s + d.amount, 0)

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {prospect.name}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  STATUS_COLORS[prospect.status] || STATUS_COLORS.NEW
                }`}
              >
                {STATUS_LABELS[prospect.status] || prospect.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>{prospect.email}</span>
              {prospect.phone && <span>{prospect.phone}</span>}
              <span className="capitalize">{prospect.source.replace("_", " ")}</span>
              <span>
                {new Date(prospect.createdAt).toLocaleDateString()}
              </span>
            </div>
            {depositTotal > 0 && (
              <p className="text-sm text-green-600 font-medium mt-1">
                ${(depositTotal / 100).toLocaleString()} deposited
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <select
                value={prospect.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updatingStatus}
                className="appearance-none text-sm px-3 py-1.5 pr-8 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent disabled:opacity-50"
              >
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>

            <button
              onClick={onToggleDeposit}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <DollarSign className="h-3.5 w-3.5" />
              Collect Deposit
            </button>
          </div>
        </div>

        {showDeposit && (
          <CollectDepositForm
            prospectId={prospect.id}
            prospectName={prospect.name}
            prospectEmail={prospect.email}
            prospectPhone={prospect.phone}
            userId={userId}
            copiedLink={copiedLink}
            onCopiedLink={onCopiedLink}
          />
        )}
      </CardContent>
    </Card>
  )
}

function CollectDepositForm({
  prospectId,
  prospectName,
  prospectEmail,
  prospectPhone,
  userId,
  copiedLink,
  onCopiedLink,
}: {
  prospectId: string
  prospectName: string
  prospectEmail: string
  prospectPhone: string | null
  userId: string
  copiedLink: string | null
  onCopiedLink: (id: string | null) => void
}) {
  const [amount, setAmount] = useState("500")
  const [generating, setGenerating] = useState(false)
  const [depositUrl, setDepositUrl] = useState("")
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    const numAmount = parseFloat(amount)
    if (!numAmount || numAmount <= 0) {
      setError("Enter a valid amount")
      return
    }

    setGenerating(true)
    setError("")

    try {
      const res = await fetch("/api/create-deposit-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numAmount,
          prospectId,
          customerName: prospectName,
          customerEmail: prospectEmail,
          customerPhone: prospectPhone,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to generate link")
      }

      const data = await res.json()
      setDepositUrl(data.depositUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setGenerating(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(depositUrl)
    onCopiedLink(prospectId)
    setTimeout(() => onCopiedLink(null), 2000)
  }

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Deposit Amount ($)
          </label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4" /> Generate Payment Link
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}

      {depositUrl && (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={depositUrl}
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted text-foreground text-sm"
          />
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
          >
            {copiedLink === prospectId ? (
              <>
                <Check className="h-4 w-4 text-green-600" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
