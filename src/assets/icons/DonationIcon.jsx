const DonationIcon = ({ className = '', size = 64, showBackground = true }) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      backgroundColor: showBackground ? '#FBF6EF' : 'transparent',
    }}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 64 64"
      fill="none"
      stroke="#E4342F"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Heart */}
      <path d="M32 16 C32 11 26 8 21 11 C16 14 16 21 32 32 C48 21 48 14 43 11 C38 8 32 11 32 16Z" />

      {/* Left hand */}
      <path d="M10 50 C14 42 22 40 28 44 L30 46" />
      <path d="M10 50 C7 54 8 60 14 62 L26 64" />

      {/* Right hand */}
      <path d="M54 50 C50 42 42 40 36 44 L34 46" />
      <path d="M54 50 C57 54 56 60 50 62 L38 64" />
    </svg>
  </div>
)

export default DonationIcon