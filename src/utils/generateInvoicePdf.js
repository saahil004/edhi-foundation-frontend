import { jsPDF } from 'jspdf'

const frequencyLabels = {
  single: 'One-time',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
}

/**
 * Built entirely from data already sitting in the donation form's own state
 * at the confirmation step — no backend round trip. That sidesteps two real
 * problems: a recurring donation's ledger row (from the webhook) may not
 * exist yet at this exact moment, and its payment_reference format (the
 * invoice id) differs from a one-time donation's (the PaymentIntent id), so
 * there's no single reliable key to look either up by right after checkout.
 */
export function generateInvoicePdf({
  donorName,
  donorEmail,
  amount,
  frequency,
  programName,
  reference,
  date = new Date(),
}) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 56
  let y = 64

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(6, 78, 59) // green-950-ish
  doc.text('Edhi Foundation', margin, y)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128) // gray-500
  doc.text('Serving humanity since 1951', margin, y + 16)

  doc.setFontSize(16)
  doc.setTextColor(220, 38, 38) // red-600
  doc.setFont('helvetica', 'bold')
  doc.text('Donation Invoice', pageWidth - margin, y, { align: 'right' })

  y += 48
  doc.setDrawColor(229, 231, 235)
  doc.line(margin, y, pageWidth - margin, y)
  y += 32

  const row = (label, value) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(31, 41, 55)
    doc.text(label, margin, y)

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(55, 65, 81)
    doc.text(String(value), margin + 140, y)
    y += 24
  }

  row('Donor', donorName || '—')
  row('Email', donorEmail || '—')
  row('Program', programName || 'General Fund')
  row('Frequency', frequencyLabels[frequency] ?? frequency)
  row('Amount', `$${Number(amount).toFixed(2)} USD`)
  row('Date', date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }))
  row('Reference', reference || '—')

  y += 16
  doc.line(margin, y, pageWidth - margin, y)
  y += 32

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.setTextColor(107, 114, 128)
  doc.text(
    'Thank you for your generosity. This receipt confirms your donation to the Abdul Sattar Edhi Foundation.',
    margin,
    y,
    { maxWidth: pageWidth - margin * 2 },
  )

  const fileSafeRef = (reference || 'donation').replace(/[^a-zA-Z0-9_-]/g, '')
  doc.save(`edhi-foundation-invoice-${fileSafeRef}.pdf`)
}
