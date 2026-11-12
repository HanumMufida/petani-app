import { useEffect, useRef, useState, type ReactNode } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
const BASE = import.meta.env.BASE_URL

type Tab = 'home' | 'groovi' | 'spring' | 'profile' | 'gladipoint' | 'gladisplash' | 'agrosplash' | 'konsultasi'

function Icon({
  name,
  size = 24,
  strokeWidth = 1.8,
}: {
  name: string
  size?: number
  strokeWidth?: number
}) {
  const paths: Record<string, ReactNode> = {
    home: (
      <>
        <path d="M3.5 10.5 12 3l8.5 7.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
        <path d="M9 21v-7h6v7" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 2 1.25 3.75L17 7l-3.75 1.25L12 12l-1.25-3.75L7 7l3.75-1.25z" />
        <path d="m18 13 .9 2.1L21 16l-2.1.9L18 19l-.9-2.1L15 16l2.1-.9z" />
        <path d="m5 13 .65 1.35L7 15l-1.35.65L5 17l-.65-1.35L3 15l1.35-.65z" />
      </>
    ),
    drone: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M8 8l3 3m5-3-3 3m-5 5 3-3m5 3-3-3m-2-2h2v2h-2z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21c.7-4.2 3.3-6.4 8-6.4s7.3 2.2 8 6.4" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m5 18 5-5 3 3 2-2 4 4" />
      </>
    ),
    send: (
      <>
        <path d="m3 11 17-7-7 17-2.5-7.5z" />
        <path d="M10.5 13.5 20 4" />
      </>
    ),
    headset: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 13h3v6H5a1 1 0 0 1-1-1zm16 0h-3v6h2a1 1 0 0 0 1-1zM17 19c0 1.4-1.6 2-4 2" />
      </>
    ),
    receipt: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
        <path d="M9 8h6m-6 4h6" />
      </>
    ),
    back: <path d="m15 18-6-6 6-6" />,
    trophy: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
        <path d="M8 6H4.5c0 3 1.5 4.5 3.7 4.8M16 6h3.5c0 3-1.5 4.5-3.7 4.8M12 13v4m-3.5 3h7M10 17h4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 10h5a1 1 0 0 1 1 1v10M2 21h20" />
        <path d="M8 8h2M8 12h2M8 16h2" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    medal: (
      <>
        <circle cx="12" cy="15" r="5" />
        <path d="m8.5 3 3.500 6M15.500 3 12 9M12 12.500v5" />
      </>
    ),
    phone: <path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
    chat: (
      <>
        <path d="M4 20l1.300-4A8 8 0 1 1 8 18.700z" />
        <path d="M9 9.500c.5 2.500 2.500 4.500 5 5l1.500-1.500-2-1-1 .8c-.8-.4-1.500-1.100-1.800-1.800l.8-1-1-2z" />
      </>
    ),
    droplet: <path d="M12 3s6 6.200 6 10.500a6 6 0 0 1-12 0C6 9.200 12 3 12 3z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.500M12 19.500V22M2 12h2.500M19.500 12H22M5 5l1.800 1.800M17.200 17.200 19 19M19 5l-1.800 1.800M6.800 17.200 5 19" />
      </>
    ),
    apple: (
      <>
        <path d="M12 8c-2-1.500-6-1-6 4 0 4 2.500 8 4.500 8 .8 0 1-.5 1.500-.5s.7.5 1.500.5c2 0 4.500-4 4.500-8 0-5-4-5.500-6-4z" />
        <path d="M12 8c0-2 1-3.500 3-4" />
      </>
    ),
    twig: <path d="M4 20 17 7M10.500 13.500 6 12.500M13.500 10.500 12.500 6M17 7l4-1M17 7l-1-4" />,
    bowl: (
      <>
        <path d="M3 12h18a9 8 0 0 1-18 0z" />
        <path d="M8 9c-1-1.500 1-2 0-3.500M12 9c-1-1.500 1-2 0-3.500M16 9c-1-1.500 1-2 0-3.500" />
      </>
    ),
    cup: (
      <>
        <path d="M4 9h11v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
        <path d="M15 10h2a2.500 2.500 0 0 1 0 5h-2M7 6c-.8-1 .8-1.500 0-2.500M11 6c-.8-1 .8-1.500 0-2.500" />
      </>
    ),
    sprout: (
      <>
        <path d="M12 21V11" />
        <path d="M12 14c0-3.500-2.500-6-6-6 0 3.500 2.500 6 6 6zM12 12c0-3 2-5 5.500-5 0 3-2 5-5.500 5z" />
      </>
    ),
    carrot: (
      <>
        <path d="M14.500 7.500c3 3 3 6.500 0 9.500L5 21l1.500-9.500c3-3 5-3.500 8-4z" />
        <path d="M14.500 7.500 17 4M14.500 7.500 20 7M14.500 7.500 15 3" />
      </>
    ),
    wheat: (
      <>
        <path d="M12 21V8" />
        <path d="M12 8c-2 0-3-1.500-3-3 2 0 3 1 3 3zm0 0c2 0 3-1.500 3-3-2 0-3 1-3 3zM12 13c-2 0-3.500-1-3.500-3 2 0 3.500 1 3.500 3zm0 0c2 0 3.500-1 3.500-3-2 0-3.500 1-3.500 3zM12 18c-2 0-3.500-1-3.500-3 2 0 3.500 1 3.500 3zm0 0c2 0 3.500-1 3.500-3-2 0-3.500 1-3.500 3z" />
      </>
    ),
    weight: (
      <>
        <circle cx="12" cy="5.500" r="2.500" />
        <path d="M8 8h8l3.500 12h-15z" />
        <path d="M9.500 15h5" />
      </>
    ),
    truck: (
      <>
        <path d="M2 6h11v10H2zM13 9h4l3 3v4h-7" />
        <circle cx="6" cy="17.500" r="1.800" />
        <circle cx="16.500" cy="17.500" r="1.800" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 7h9M19 7h1M4 17h1M11 17h9" />
        <circle cx="16" cy="7" r="2.500" />
        <circle cx="8" cy="17" r="2.500" />
      </>
    ),
    camera: (
      <>
        <path d="M4 8h3l1.500-2.500h7L17 8h3v11H4z" />
        <circle cx="12" cy="13" r="3.500" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3M12 15.500v.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14.5-4M4 5v3h3" />
        <path d="M4 13a8 8 0 0 0 14.5 4M20 19v-3h-3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.500 7-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
        <path d="M10 21h4" />
      </>
    ),
    qr: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3h-3zm4 4h3m-3-4h3M14 20h1" />
      </>
    ),
    gift: (
      <>
        <rect x="3.5" y="8" width="17" height="4" rx="1" />
        <path d="M5 12v8h14v-8M12 8v12M12 8C9 8 7.5 6.5 8.5 5S12 5 12 8zm0 0c3 0 4.5-1.5 3.5-3S12 5 12 8z" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="3" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),
    box: (
      <>
        <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
        <path d="m4 7 8 4 8-4M12 11v10" />
      </>
    ),
    drop: (
      <>
        <path d="M12 3c3 4 5.500 6.800 5.500 10a5.500 5.500 0 0 1-11 0C6.500 9.800 9 7 12 3Z" />
        <path d="M9.500 14a2.500 2.500 0 0 0 2.500 2.500" />
      </>
    ),
    more: (
      <>
        <circle cx="6" cy="12" r="1.200" />
        <circle cx="12" cy="12" r="1.200" />
        <circle cx="18" cy="12" r="1.200" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    barchart: <path d="M6 20V11M12 20V4M18 20v-6" />,
    linechart: <path d="M3 17l6-6 4 4 8-9" />,
    download: (
      <>
        <path d="M12 4v11M7.500 10.500 12 15l4.500-4.500M5 20h14" />
      </>
    ),
    store: (
      <>
        <path d="M4 9l1.500-5h13L20 9" />
        <path d="M4 9a2.700 2.700 0 0 0 5.300 0 2.700 2.700 0 0 0 5.400 0A2.700 2.700 0 0 0 20 9" />
        <path d="M5 12v8h14v-8M10 20v-5h4v5" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4L19 9l-4-4L4 16v4z" />
        <path d="m13.500 6.500 4 4" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M10 11v6M14 11v6" />
        <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
      </>
    ),
    recycle: (
      <>
        <path d="M7 19H5.500a1.500 1.500 0 0 1-1.300-2.200L6 14M17 19l2-3.500M12 4.500l1.700 3M9 8 7.500 5.500M15 8l2.500-1M10 19h5" />
        <path d="m11 17-2 2 2 2M14 6l-1.500 2.500H16" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c.5-3.8 3-5.5 6.5-5.5s6 1.7 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .6 3.2 2.3 3.5 5.2" />
      </>
    ),
    activity: <path d="M3 12h4l3-8 4 16 3-8h4" />,
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V3h6v1M9 11h6m-6 4h6" />
      </>
    ),
    chevron: <path d="m9 6 6 6-6 6" />,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    area: (
      <>
        <path d="m4 18 5-8 4 5 3-4 4 7z" />
        <path d="M4 5v14h16" />
      </>
    ),
    crop: (
      <>
        <path d="M5 20c0-7 3-11 9-14M8 13c-3 0-5-2-5-5 3 0 5 1 6 3m4 0c0-4 2-7 7-8 0 5-2 8-7 9m-1-1v9" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 6-9 6-9-6z" />
        <path d="m5 13 7 5 7-5m-14 4 7 5 7-5" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 10-6 10-16z" />
        <path d="M5 20c2-5 6-8 11-11" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Header({
  title,
  subtitle,
  onBack,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
}) {
  return (
    <header className="page-header">
      {onBack && (
        <button className="icon-button" onClick={onBack} aria-label="Kembali">
          <Icon name="back" />
        </button>
      )}
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  )
}

const banners = [
  { src: `${BASE}assets/promo-drone.jpg`, title: 'Promo Aplikasi Pemupukan dengan Drone' },
  { src: `${BASE}assets/samber-banner.jpg`, title: 'Program SAMBER' },
]

const products = [
  {
    src: `${BASE}assets/product-kplus.jpg`,
    name: 'Petro K Plus 30',
    desc: 'Petro K Plus 30 adalah pupuk KCl Boron berbentuk granul.',
  },
  {
    src: `${BASE}assets/product-cas.jpg`,
    name: 'PETRO-CAS (Calcium Sulfat)',
    desc: 'Petro-CAS adalah pembenah tanah kalsium sulfat.',
  },
]

type Account = { name: string; email: string; phone: string; address: string }

const initialAccount: Account = { name: 'Demo Farmer', email: 'farmer@agrifertile.com', phone: '', address: '' }

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?'

const roles = ['Petani', 'Agroman', 'Agronomis', 'Mitra', 'Admin', 'Super Admin'] as const
type AppRole = (typeof roles)[number]

function AccountPage({
  role,
  setRole,
  account,
  setAccount,
  photo,
  setPhoto,
  title,
  onBack,
}: {
  role?: AppRole
  setRole?: (role: AppRole) => void
  account: Account
  setAccount: (account: Account) => void
  photo: string | null
  setPhoto: (photo: string | null) => void
  title: string
  onBack: () => void
}) {
  const [sheet, setSheet] = useState<'photo' | 'edit' | 'password' | 'role' | null>(null)
  const [land, setLand] = useState(false)
  const [notice, setNotice] = useState('')
  const [draft, setDraft] = useState(account)
  const [pass, setPass] = useState({ old: '', next: '', again: '' })
  const [passError, setPassError] = useState('')
  const cameraRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  if (land) return <LandProfile onBack={() => setLand(false)} />

  function pick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
      setNotice('Foto profil diperbarui di AgroFertile dan GladiPoint.')
      setSheet(null)
    }
    event.target.value = ''
  }

  return (
    <main className="page gladi-page account-page">
      <Header title={title} onBack={onBack} />
      {notice && (
        <p className="gp-qr-done" role="status">
          {notice}
        </p>
      )}

      <section className="acc-card">
        <div className="acc-top">
          <button className="acc-avatar" onClick={() => setSheet('photo')} aria-label="Ubah foto profil">
            {photo ? <img src={photo} alt="Foto profil" /> : initialsOf(account.name)}
            <span className="acc-cam">
              <Icon name="camera" size={14} />
            </span>
          </button>
          <div>
            <strong>{account.name}</strong>
            <span>{account.email}</span>
          </div>
        </div>
        <hr />
        <p>
          <Icon name="phone" size={20} />
          {account.phone || 'Belum Diatur'}
        </p>
        <p>
          <Icon name="pin" size={20} />
          {account.address || 'Belum Diatur'}
        </p>
      </section>

      <aside className="question-example gp-warning pt-note acc-note">
        <p>
          <Icon name="info" size={16} />
          <span>
            <b>Satu akun untuk AgroFertile dan GladiPoint.</b> Perubahan pada pengaturan akun juga akan mengubah
            data Anda di AgroFertile.
          </span>
        </p>
      </aside>

      <h2 className="acc-label">PENGATURAN AKUN</h2>
      <section className="acc-menu">
        {(
          [
            ['user', 'Edit Profil', 'Ubah nama, email, telepon & alamat', 'edit'],
            ['area', 'Profil Lahan', 'Ubah luas, jenis tanah dan tanaman', 'land'],
            ['lock', 'Ubah Kata Sandi', 'Ganti kata sandi akun Anda', 'password'],
          ] as const
        ).map(([icon, title, desc, key]) => (
          <button
            key={key}
            onClick={() => {
              if (key === 'land') setLand(true)
              else {
                setDraft(account)
                setPass({ old: '', next: '', again: '' })
                setPassError('')
                setSheet(key)
              }
            }}
          >
            <Icon name={icon} size={24} />
            <div>
              <strong>{title}</strong>
              <span>{desc}</span>
            </div>
            <Icon name="chevron" size={18} />
          </button>
        ))}
      </section>

      {role && setRole && (
        <>
          <h2 className="acc-label">MOCKUP</h2>
          <section className="acc-menu">
            <button onClick={() => setSheet('role')}>
              <Icon name="refresh" size={24} />
              <div>
                <strong>Pindah Role</strong>
                <span>Role aktif: {role}</span>
              </div>
              <Icon name="chevron" size={18} />
            </button>
          </section>
        </>
      )}

      <input ref={cameraRef} type="file" accept="image/*" capture="user" hidden onChange={pick} />
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={pick} />

      {sheet && (
        <div className="modal-backdrop" onClick={() => setSheet(null)}>
          <section className="promo-sheet gp-sheet" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setSheet(null)} aria-label="Tutup" />
            {sheet === 'role' && role && setRole && (
              <>
                <h2>Pindah role</h2>
                <div className="photo-actions role-list">
                  {roles.map((item) => (
                    <button
                      key={item}
                      className={item === role ? 'current' : ''}
                      onClick={() => {
                        setRole(item)
                        setNotice(`Role aktif: ${item}.`)
                        setSheet(null)
                      }}
                    >
                      <Icon name="user" size={22} /> {item}
                      {item === role && <Icon name="check" size={18} strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </>
            )}
            {sheet === 'photo' && (
              <>
                <h2>Foto profil</h2>
                <div className="photo-actions">
                  <button onClick={() => cameraRef.current?.click()}>
                    <Icon name="camera" size={22} /> Ambil foto langsung
                  </button>
                  <button onClick={() => fileRef.current?.click()}>
                    <Icon name="image" size={22} /> Upload dari galeri
                  </button>
                  {photo && (
                    <button
                      className="danger"
                      onClick={() => {
                        setPhoto(null)
                        setNotice('Foto profil dihapus.')
                        setSheet(null)
                      }}
                    >
                      Hapus foto
                    </button>
                  )}
                </div>
                <p className="acc-sheet-note">Foto yang Anda pilih juga tampil di AgroFertile.</p>
              </>
            )}
            {sheet === 'edit' && (
              <>
                <h2>Edit Profil</h2>
                <div className="acc-form">
                  {(
                    [
                      ['name', 'Nama'],
                      ['email', 'Email'],
                      ['phone', 'Telepon'],
                      ['address', 'Alamat'],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key}>
                      <span>{label}</span>
                      <input
                        value={draft[key]}
                        onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
                        placeholder={key === 'phone' || key === 'address' ? 'Belum diatur' : ''}
                      />
                    </label>
                  ))}
                </div>
                <p className="acc-sheet-note">Perubahan ini juga mengubah data di AgroFertile.</p>
                <button
                  className="rw-cta"
                  disabled={!draft.name.trim() || !draft.email.trim()}
                  onClick={() => {
                    setAccount({ ...draft, name: draft.name.trim() })
                    setNotice('Profil disimpan dan berlaku di AgroFertile dan GladiPoint.')
                    setSheet(null)
                  }}
                >
                  Simpan
                </button>
              </>
            )}
            {sheet === 'password' && (
              <>
                <h2>Ubah Kata Sandi</h2>
                <div className="acc-form">
                  {(
                    [
                      ['old', 'Kata sandi lama'],
                      ['next', 'Kata sandi baru'],
                      ['again', 'Ulangi kata sandi baru'],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key}>
                      <span>{label}</span>
                      <input
                        type="password"
                        value={pass[key]}
                        onChange={(event) => setPass({ ...pass, [key]: event.target.value })}
                      />
                    </label>
                  ))}
                </div>
                {passError && <p className="acc-error">{passError}</p>}
                <p className="acc-sheet-note">Kata sandi baru juga berlaku untuk login AgroFertile.</p>
                <button
                  className="rw-cta"
                  onClick={() => {
                    if (!pass.old) return setPassError('Isi kata sandi lama.')
                    if (pass.next.length < 6) return setPassError('Kata sandi baru minimal 6 karakter.')
                    if (pass.next !== pass.again) return setPassError('Ulangi kata sandi harus sama.')
                    setNotice('Kata sandi berhasil diubah di AgroFertile dan GladiPoint.')
                    setSheet(null)
                  }}
                >
                  Simpan
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  )
}

function Home({
  setTab,
  points,
  account,
  photo,
  role,
  redemptions,
}: {
  role: AppRole
  setTab: (tab: Tab) => void
  points: number
  account: Account
  photo: string | null
  redemptions: Redemption[]
}) {
  const [promo, setPromo] = useState<number | null>(null)
  const [banner, setBanner] = useState(0)
  const admin = role === 'Super Admin'
  const adminRows = mitraRanking(periodOf(TODAY))

  return (
    <>
      <main className="page home-page">
        <section className="welcome">
          <div>
            <h1>Hi, {account.name}</h1>
            <p>
              Selamat datang di AgroFertile <span>{role === 'Petani' ? 'Pengguna' : role}</span>
            </p>
          </div>
          <button className="avatar" onClick={() => setTab('profile')} aria-label="Buka profil">
            {photo ? <img src={photo} alt="" /> : initialsOf(account.name)}
          </button>
        </section>

        {admin ? (
          <button className="farm-card" onClick={() => setTab('gladisplash')}>
            <svg className="farm-deco" viewBox="0 0 200 120" aria-hidden="true">
              <path d="M-10 90C30 60 60 100 100 70s70-30 110-10" />
              <path d="M-10 110C30 80 60 120 100 90s70-30 110-10" />
            </svg>
            <div className="farm-location">
              <Icon name="pin" size={14} />
              <span>Seluruh wilayah program GladiPoint · Jawa Timur</span>
            </div>
            <div className="farm-row">
              <div className="farm-area">
                <strong>{adminRows.length}</strong>
                <span>Mitra</span>
              </div>
              <div className="farm-stats">
                <div>
                  <span>BSO {periodOf(TODAY)}</span>
                  <strong>{idNumber(adminRows.reduce((sum, row) => sum + row.kg, 0))} kg</strong>
                </div>
                <div>
                  <span>Member</span>
                  <strong>{mitraMembers.length}</strong>
                </div>
                <div>
                  <span>Hadiah menunggu</span>
                  <strong>{redemptions.filter((item) => !item.received).length}</strong>
                </div>
              </div>
            </div>
          </button>
        ) : (
        <button className="farm-card" onClick={() => setTab('profile')}>
          <svg className="farm-deco" viewBox="0 0 200 120" aria-hidden="true">
            <path d="M-10 90C30 60 60 100 100 70s70-30 110-10" />
            <path d="M-10 110C30 80 60 120 100 90s70-30 110-10" />
          </svg>
          <div className="farm-location">
            <Icon name="pin" size={14} />
            <span>Tumenggungan, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62214</span>
          </div>
          <div className="farm-row">
            <div className="farm-area">
              <strong>2</strong>
              <span>Hektar</span>
            </div>
            <div className="farm-stats">
              <div>
                <span>Komoditas</span>
                <strong>Padi</strong>
              </div>
              <div>
                <span>Jenis Pupuk</span>
                <strong>Tunggal</strong>
              </div>
              <div>
                <span>Jenis Pertanian</span>
                <strong>Pangan</strong>
              </div>
            </div>
          </div>
        </button>
        )}

        <section className="quick-grid" aria-label="Akses cepat">
          <button onClick={() => setTab('gladisplash')}>
            <Icon name="trophy" size={30} />
            <span>GladiPoint</span>
            <span className="points-pill">{admin ? `${adminRows.length} Mitra` : `${points} Poin`}</span>
          </button>
          <button onClick={() => setTab('spring')}>
            <Icon name="drone" size={30} />
            <span>Petro Spring</span>
          </button>
        </section>

        <div
          className="promo-track"
          onScroll={(event) => {
            const el = event.currentTarget
            setBanner(Math.round(el.scrollLeft / el.clientWidth))
          }}
        >
          {banners.map((item, index) => (
            <button
              key={item.src}
              className="promo"
              onClick={() => setPromo(index)}
              aria-label={`Lihat ${item.title}`}
            >
              <img src={item.src} alt={item.title} />
            </button>
          ))}
        </div>
        <div className="dots" aria-hidden="true">
          {banners.map((item, index) => (
            <i key={item.src} className={banner === index ? 'active' : ''} />
          ))}
        </div>

        <section className="catalog">
          <div className="section-heading">
            <h2>Katalog Pupuk</h2>
            <button>Selengkapnya</button>
          </div>
          <div className="products">
            {products.map((item) => (
              <button key={item.name}>
                <img src={item.src} alt={item.name} />
                <strong>{item.name}</strong>
                <span>{item.desc}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {promo !== null && (
        <div className="modal-backdrop" onClick={() => setPromo(null)}>
          <section className="promo-sheet" onClick={(event) => event.stopPropagation()}>
            <button
              className="sheet-handle"
              onClick={() => setPromo(null)}
              aria-label="Tutup detail promosi"
            />
            <img src={banners[promo].src} alt={banners[promo].title} />
            <h2>{banners[promo].title}</h2>
          </section>
        </div>
      )}
    </>
  )
}

function AgroSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2400)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="gladi-splash agro-splash" onClick={onDone} role="status" aria-label="Kembali ke AgroFertile">
      <div className="splash-center">
        <img className="splash-logo agro-logo" src={`${BASE}assets/agrofertile-logo.png`} alt="AgroFertile Apps" />
      </div>
      <div className="splash-footer">
        <div className="splash-progress agro-progress" aria-hidden="true">
          <i />
        </div>
        <span>Kembali ke AgroFertile</span>
      </div>
    </div>
  )
}

function GladiSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="gladi-splash" onClick={onDone} role="status" aria-label="Memuat GladiPoint">
      <svg className="splash-leaf leaf-a" viewBox="0 0 120 160" aria-hidden="true">
        <path d="M110 6C40 10 6 52 8 108c1 26 18 46 44 46 52 0 62-72 58-148z" />
      </svg>
      <svg className="splash-leaf leaf-b" viewBox="0 0 120 160" aria-hidden="true">
        <path d="M110 6C40 10 6 52 8 108c1 26 18 46 44 46 52 0 62-72 58-148z" />
      </svg>
      <div className="splash-center">
        <img className="splash-logo" src={`${BASE}assets/gladipoint-logo.png`} alt="GladiPoint" />
        <p className="splash-tagline">Bersama untuk Pertanian Lebih Baik</p>
      </div>
      <div className="splash-footer">
        <div className="splash-progress" aria-hidden="true">
          <i />
        </div>
        <span>Ketuk untuk melanjutkan</span>
      </div>
    </div>
  )
}

const GLADI_POINTS = 62

type Activity = {
  id: string
  kind: 'setoran' | 'tukar'
  ref: string
  status: 'Terverifikasi' | 'Berhasil' | 'Menunggu diambil' | 'Diterima'
  title: string
  meta: string
  amount: string
  points: string
  name: string
  member: string
  note?: string
}

const initialActivities: Activity[] = [
  {
    id: 'a2',
    kind: 'setoran',
    ref: 'BSO-000002',
    status: 'Berhasil',
    title: 'PKG Cabang Bojonegoro',
    meta: '5 Nov, 10.15 WIB · Sampah basah',
    amount: '8 kg',
    points: '+21 poin',
    name: 'Demo Farmer',
    member: 'GP-00001',
  },
  {
    id: 'a1',
    kind: 'setoran',
    ref: 'BSO-000001',
    status: 'Terverifikasi',
    title: 'PKG Cabang Bojonegoro',
    meta: '4 Nov, 09.27 WIB · Sampah basah, Sampah kebun',
    amount: '12,5 kg',
    points: '+41 poin',
    name: 'Demo Farmer',
    member: 'GP-00001',
  },
]

const rewards = [
  {
    name: 'Petro Gladiator 1kg',
    cost: 700,
    img: `${BASE}assets/reward-gladiator.jpg`,
    stock: 25,
    desc: 'Pupuk organik Petro Gladiator kemasan 1 kg untuk membantu memperbaiki kesuburan tanah dan menambah bahan organik.',
  },
  {
    name: 'Kaos Petani',
    cost: 700,
    img: `${BASE}assets/reward-kaos.jpg`,
    stock: 40,
    desc: 'Kaos eksklusif GladiPoint berbahan nyaman, cocok dipakai bekerja di lahan maupun sehari-hari.',
  },
  {
    name: 'Phonska Cair 500ml',
    cost: 800,
    img: `${BASE}assets/reward-phonska-cair.jpg`,
    stock: 18,
    desc: 'Pupuk cair Phonska Cair NPK 10-8-3 kemasan 500 ml untuk mendukung pertumbuhan tanaman.',
  },
  {
    name: 'Phonska OCA Plus',
    cost: 1100,
    img: `${BASE}assets/reward-oca.jpg`,
    stock: 12,
    desc: 'Phonska OCA Plus kemasan 1 liter, pupuk cair untuk membantu pertumbuhan dan hasil tanaman.',
  },
]

type Reward = (typeof rewards)[number]

const fmt = (n: number) => n.toLocaleString('id-ID')

function RewardCard({
  reward,
  points,
  onClick,
  onRedeem,
}: {
  reward: Reward
  points: number
  onClick?: () => void
  onRedeem?: (reward: Reward) => void
}) {
  const enough = points >= reward.cost
  return (
    <div className="reward-card" onClick={onClick}>
      <div className="reward-photo">
        {reward.img ? <img src={reward.img} alt={reward.name} /> : <Icon name="gift" size={40} />}
      </div>
      <div className="reward-meta">
        <span>Barang</span>
        <span>Tersedia</span>
      </div>
      <strong>{reward.name}</strong>
      <p>
        <b>{fmt(reward.cost)}</b> poin
      </p>
      <div className="reward-bar" aria-hidden="true">
        <i style={{ width: `${Math.min(points / reward.cost, 1) * 100}%` }} />
      </div>
      {enough && onRedeem ? (
        <button
          className="redeem-btn"
          onClick={(event) => {
            event.stopPropagation()
            onRedeem(reward)
          }}
        >
          Tukar
        </button>
      ) : (
        <small>{enough ? 'Poin cukup' : `Kurang ${fmt(reward.cost - points)} poin`}</small>
      )}
    </div>
  )
}

function StatusPill({ status }: { status: Activity['status'] }) {
  const waiting = status === 'Menunggu diambil'
  return (
    <span className={`status-pill${waiting ? ' pending' : ''}`}>
      <Icon name={waiting ? 'clock' : 'check'} size={13} strokeWidth={2.4} />
      {status}
    </span>
  )
}

function ActivityCard({ item, onClick }: { item: Activity; onClick?: () => void }) {
  const tukar = item.kind === 'tukar'
  const content = (
    <>
      <div className="act-main">
        <div className="act-head">
          <span>{item.ref}</span>
          {tukar && <StatusPill status={item.status} />}
        </div>
        <strong>{item.title}</strong>
        <small>{item.meta}</small>
        {item.note && <small className={`act-note${item.status === 'Diterima' ? ' done' : ''}`}>{item.note}</small>}
      </div>
      <div className="act-side">
        <b>{item.amount}</b>
        <span className={tukar ? 'minus' : ''}>{item.points}</span>
      </div>
    </>
  )
  return onClick ? (
    <button className="act-card" onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className="act-card">{content}</div>
  )
}

type GladiView = 'home' | 'notifikasi' | 'poin' | 'mitra' | 'kontribusi' | 'aktivitas' | 'hadiah' | 'peringkat' | 'mitra' | 'akun'

const gladiMenus = [
  { view: 'aktivitas', icon: 'activity', label: 'Aktivitas', badge: '' },
  { view: 'hadiah', icon: 'gift', label: 'Hadiah', badge: '' },
  { view: 'peringkat', icon: 'trophy', label: 'Peringkat', badge: '#1' },
  { view: 'mitra', icon: 'users', label: 'Mitra saya', badge: '' },
] as const

const contributions = [
  {
    month: 'November 2026',
    kg: '20,5 kg',
    points: 62,
    items: [
      {
        place: 'PKG Cabang Bojonegoro',
        kg: '8 kg',
        points: 21,
        submitted: '5 Nov 2026, 10.15 WIB',
      },
      {
        place: 'PKG Cabang Bojonegoro',
        kg: '12,5 kg',
        points: 41,
        submitted: '4 Nov 2026, 09.27 WIB',
      },
    ],
  },
  {
    month: 'Oktober 2026',
    kg: '10 kg',
    points: 33,
    items: [
      {
        place: 'PKG Cabang Bojonegoro',
        kg: '10 kg',
        points: 33,
        submitted: '18 Okt 2026, 08.50 WIB',
      },
    ],
  },
]

function QrMock({ seed }: { seed: string }) {
  const n = 25
  let h = 0
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0
  const rnd = () => {
    h ^= h << 13
    h >>>= 0
    h ^= h >>> 17
    h ^= h << 5
    h >>>= 0
    return h / 4294967296
  }
  const corners = [
    [0, 0],
    [n - 7, 0],
    [0, n - 7],
  ]
  const inCorner = (x: number, y: number) =>
    corners.some(([a, b]) => x >= a - 1 && x < a + 8 && y >= b - 1 && y < b + 8)
  const cells = []
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++)
      if (!inCorner(x, y) && rnd() > 0.5) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)

  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} role="img" aria-label="QR member" fill="#14301f">
      {cells}
      {corners.map(([a, b]) => (
        <g key={`${a}-${b}`}>
          <rect x={a + 0.5} y={b + 0.5} width="6" height="6" fill="none" stroke="#14301f" strokeWidth="1" />
          <rect x={a + 2} y={b + 2} width="3" height="3" />
        </g>
      ))}
    </svg>
  )
}

function QrSheet({
  version,
  onRegenerate,
  onClose,
}: {
  version: number
  onRegenerate: () => void
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [confirming, setConfirming] = useState(false)
  const [notice, setNotice] = useState(false)
  const startY = useRef<number | null>(null)

  function endDrag() {
    if (startY.current === null) return
    if (dragY < -50) setExpanded(true)
    else if (dragY > 70) {
      if (expanded) setExpanded(false)
      else onClose()
    }
    startY.current = null
    setDragY(0)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className={`promo-sheet gp-sheet gp-qr-sheet${expanded ? ' full' : ''}`}
        style={dragY > 0 ? { translate: `0 ${dragY}px`, transition: 'none' } : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="sheet-grab"
          onPointerDown={(event) => {
            startY.current = event.clientY
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (startY.current !== null) setDragY(event.clientY - startY.current)
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClick={() => !dragY && setExpanded((value) => !value)}
          role="button"
          aria-label={expanded ? 'Perkecil QR' : 'Perbesar QR'}
        >
          <i />
          <span>{expanded ? 'Tarik ke bawah untuk memperkecil' : 'Tarik ke atas untuk memperbesar'}</span>
        </div>

        <h2 className="gp-qr-title">Tunjukkan ke petugas</h2>
        <div className="gp-qr">
          <QrMock seed={`GP-00001-${version}`} />
        </div>
        <div className="gp-qr-owner">
          <strong>Demo Farmer</strong>
          <span>GP-00001</span>
        </div>

        {notice && (
          <p className="gp-qr-done" role="status">
            QR baru berhasil dibuat. QR lama tidak berlaku lagi.
          </p>
        )}

        <aside className="question-example gp-warning">
          <strong>
            <Icon name="shield" size={18} /> Jangan bagikan QR Anda
          </strong>
          <p>
            Tunjukkan QR ini hanya kepada petugas mitra. Jangan berikan atau kirim ke orang lain. Jika
            tangkapan layar QR Anda sudah tersebar, buat QR baru.
          </p>
        </aside>

        {confirming ? (
          <div className="gp-confirm">
            <p>QR yang lama tidak akan bisa dipakai lagi. Lanjutkan?</p>
            <div>
              <button onClick={() => setConfirming(false)}>Batal</button>
              <button
                className="strong"
                onClick={() => {
                  onRegenerate()
                  setConfirming(false)
                  setNotice(true)
                }}
              >
                Ya, buat baru
              </button>
            </div>
          </div>
        ) : (
          <button className="gp-regen" onClick={() => setConfirming(true)}>
            <Icon name="refresh" size={20} />
            Buat QR baru
          </button>
        )}
      </section>
    </div>
  )
}

type Entry = { name: string; kg: number; photo: string; me?: boolean }

const periods = {
  nov: {
    label: 'Periode ini · November 2026',
    status: 'Berjalan',
    note: 'Periode masih berlangsung. Peringkat diperbarui setiap setoran disahkan. Penutupan: 3 Des 2026, 23.59 WIB.',
    rows: [
      { name: 'Demo F.', kg: 12.5, photo: `${BASE}assets/peserta-1.jpg`, me: true },
      { name: 'Siti R.', kg: 11, photo: `${BASE}assets/peserta-2.jpg` },
      { name: 'Sri W.', kg: 9.5, photo: `${BASE}assets/peserta-3.jpg` },
      { name: 'Budi S.', kg: 7, photo: `${BASE}assets/peserta-4.jpg` },
      { name: 'Haji M.', kg: 5, photo: `${BASE}assets/peserta-5.jpg` },
    ] as Entry[],
  },
  okt: {
    label: 'Oktober 2026',
    status: 'Selesai',
    note: 'Periode sudah ditutup. Peringkat tidak berubah lagi.',
    rows: [
      { name: 'Siti R.', kg: 14, photo: `${BASE}assets/peserta-2.jpg` },
      { name: 'Demo F.', kg: 10, photo: `${BASE}assets/peserta-1.jpg`, me: true },
      { name: 'Sri W.', kg: 9, photo: `${BASE}assets/peserta-3.jpg` },
      { name: 'Haji M.', kg: 6, photo: `${BASE}assets/peserta-5.jpg` },
      { name: 'Budi S.', kg: 4.5, photo: `${BASE}assets/peserta-4.jpg` },
    ] as Entry[],
  },
}

const kgText = (n: number) => `${String(n).replace('.', ',')} kg`

function Leaderboard({ onBack }: { onBack: () => void }) {
  const [period, setPeriod] = useState<keyof typeof periods>('nov')
  const data = periods[period]
  const total = data.rows.reduce((sum, row) => sum + row.kg, 0)
  const top = [data.rows[1], data.rows[0], data.rows[2]]
  const place = [2, 1, 3]

  return (
    <main className="page gladi-page">
      <Header title="Papan peringkat" onBack={onBack} />
      <p className="lb-mitra">
        <Icon name="building" size={20} /> Mitra: <b>PKG Cabang Bojonegoro</b>
      </p>
      <div className="lb-period">
        <select value={period} onChange={(event) => setPeriod(event.target.value as keyof typeof periods)} aria-label="Pilih periode">
          {Object.entries(periods).map(([key, item]) => (
            <option key={key} value={key}>
              {item.label}
            </option>
          ))}
        </select>
        <span className={data.status === 'Berjalan' ? 'lb-status' : 'lb-status done'}>
          <i /> {data.status}
        </span>
      </div>
      <p className="lb-note">
        <Icon name="info" size={20} />
        {data.note}
      </p>

      <section className="lb-podium" aria-label="Tiga peringkat teratas">
        {top.map((row, index) => (
          <div className={`lb-card rank-${place[index]}${row.me ? ' me' : ''}`} key={row.name}>
            {place[index] === 1 && (
              <span className="lb-medal">
                <Icon name="medal" size={24} />
              </span>
            )}
            <div className="lb-photo">
              <img src={row.photo} alt={row.name} />
              <b>#{place[index]}</b>
            </div>
            <strong>{row.name}</strong>
            {row.me && <em>Anda</em>}
            <span>{kgText(row.kg)}</span>
          </div>
        ))}
      </section>

      <section className="lb-list">
        {data.rows.slice(3).map((row, index) => (
          <div className={`lb-row${row.me ? ' me' : ''}`} key={row.name}>
            <b>#{index + 4}</b>
            <img src={row.photo} alt={row.name} />
            <strong>{row.name}</strong>
            {row.me && <em>Anda</em>}
            <span>{kgText(row.kg)}</span>
          </div>
        ))}
      </section>

      <p className="lb-footer">
        {data.rows.length} peserta · total {kgText(total)} terverifikasi. Seri diurutkan dari yang lebih dulu mencapai
        total tersebut.
      </p>
    </main>
  )
}

const partner = {
  name: 'PKG Cabang Bojonegoro',
  address: 'Mojodeso, Kapas, Kabupaten Bojonegoro, Jawa Timur',
  hours: 'Sen–Jum 07:00–15:00',
  phone: '085204587624',
  wa: 'https://wa.me/6285204587624?text=Halo%20PKG%20Cabang%20Bojonegoro%2C%20saya%20member%20GladiPoint%20GP-00001.',
  maps: 'https://www.google.com/maps/search/?api=1&query=Mojodeso%2C+Kapas%2C+Bojonegoro%2C+Jawa+Timur',
  accepts: [
    ['droplet', 'Sampah basah', 'Tarif poin untuk seluruh bahan hijau/nitrogen'],
    ['sun', 'Sampah kering', 'Tarif poin untuk seluruh bahan coklat/karbon'],
    ['apple', 'Sisa sayur & buah', 'Sisa sayur, kulit buah, buah afkir tanpa plastik'],
    ['twig', 'Daun & ranting kering', 'Daun kering, ranting kecil kering, serasah'],
    ['bowl', 'Sisa dapur matang', 'Nasi & sisa makanan tanpa tulang besar; tergantung kemampuan fasilitas'],
    ['cup', 'Ampas kopi & teh', 'Ampas kopi, teh, dan sejenisnya'],
    ['sprout', 'Daun hijau & rumput segar', 'Daun hijau, rumput, gulma segar tanpa biji'],
    ['carrot', 'Sisa hasil panen basah', 'Sayuran hijau sisa panen, batang dan daun yang masih segar'],
    ['wheat', 'Jerami & batang jagung', 'Jerami padi kering, batang jagung, tebon kering'],
  ],
}

function PartnerInfo() {
  return (
    <ul className="pt-info">
      <li>
        <Icon name="pin" size={20} />
        <span>{partner.address}</span>
      </li>
      <li>
        <Icon name="clock" size={20} />
        <span>{partner.hours}</span>
      </li>
    </ul>
  )
}

function AcceptedList() {
  return (
    <section className="pt-card plain accepted">
      <h3>Yang diterima</h3>
      <ul>
        {partner.accepts.map(([icon, title, desc]) => (
          <li key={title}>
            <span className="accepted-icon">
              <Icon name={icon} size={22} />
            </span>
            <div>
              <strong>{title}</strong>
              <p>{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PartnerPage({ detail, onOpen, onBack }: { detail: boolean; onOpen: () => void; onBack: () => void }) {
  if (!detail) {
    return (
      <main className="page gladi-page">
        <Header title="Mitra saya" subtitle="Lokasi setor sampah organik" onBack={onBack} />
        <aside className="question-example gp-warning pt-note">
          <p>
            <Icon name="info" size={16} />
            <span>
              <b>Pilah sampah sebelum dikumpulkan.</b> Pastikan tidak tercampur plastik, kaca, logam, atau bahan
              berbahaya.
            </span>
          </p>
        </aside>
        <div
          className="pt-card"
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={(event) => event.key === 'Enter' && onOpen()}
        >
          <div className="pt-title">
            <h2>{partner.name}</h2>
            <Icon name="chevron" size={20} />
          </div>
          <PartnerInfo />
          <a
            className="pt-phone"
            href={partner.wa}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            <Icon name="phone" size={20} />
            <span>{partner.phone}</span>
            <em>
              <Icon name="chat" size={14} /> WhatsApp
            </em>
          </a>
        </div>
        <AcceptedList />
      </main>
    )
  }

  return (
    <main className="page gladi-page">
      <Header title={partner.name} subtitle="Detail lokasi mitra" onBack={onBack} />
      <div className="map-placeholder pt-map" role="img" aria-label="Peta lokasi mitra di Kapas, Bojonegoro">
        <div className="map-label">Mojodeso</div>
        <div className="map-pin">
          <Icon name="pin" size={46} />
        </div>
      </div>
      <section className="pt-card plain">
        <PartnerInfo />
      </section>
      <div className="pt-actions">
        <a className="pt-btn primary" href={partner.wa} target="_blank" rel="noreferrer">
          <Icon name="chat" size={20} /> WhatsApp {partner.phone}
        </a>
        <a className="pt-btn" href={partner.maps} target="_blank" rel="noreferrer">
          <Icon name="pin" size={20} /> Buka di Google Maps
        </a>
      </div>
    </main>
  )
}

const pointLedger = [
  { date: '5 Nov 2026', title: 'Setoran BSO-000002', detail: 'PKG Cabang Bojonegoro · 8 kg', delta: 21, balance: 62 },
  { date: '4 Nov 2026', title: 'Setoran BSO-000001', detail: 'PKG Cabang Bojonegoro · 12,5 kg', delta: 41, balance: 41 },
  { date: '20 Okt 2026', title: 'Penukaran hadiah', detail: 'Phonska Cair 250ml', delta: -600, balance: 0 },
  { date: '18 Okt 2026', title: 'Setoran', detail: 'PKG Cabang Bojonegoro · 10 kg', delta: 33, balance: 600 },
  { date: '25 Sep 2026', title: 'Bonus event GladiPoint', detail: 'Bonus bergabung', delta: 567, balance: 567 },
]

function PointsHistory({
  points,
  activities,
  onBack,
}: {
  points: number
  activities: Activity[]
  onBack: () => void
}) {
  let balance = points
  const session = activities
    .filter((item) => item.kind === 'tukar')
    .map((item) => {
      const cost = Number(item.points.replace(/\D/g, ''))
      const row = {
        date: 'Hari ini',
        title: 'Penukaran hadiah',
        detail: item.amount,
        delta: -cost,
        balance,
      }
      balance += cost
      return row
    })
  const redeemedNow = session.reduce((sum, row) => sum - row.delta, 0)
  const ledger = [...session, ...pointLedger]

  return (
    <main className="page gladi-page">
      <Header title="Riwayat poin" subtitle="Poin masuk dan poin ditukar" onBack={onBack} />
      <section className="ph-summary">
        <div className="now">
          <span>Poin saat ini</span>
          <strong>{points}</strong>
          <small>Berlaku s.d. 31 Des 2026</small>
        </div>
        <div className="earned">
          <span>Total diperoleh</span>
          <strong>641</strong>
        </div>
        <div className="spent">
          <span>Ditukar</span>
          <strong>{600 + redeemedNow}</strong>
        </div>
      </section>
      <aside className="question-example gp-warning pt-note ph-expire">
        <p>
          <Icon name="clock" size={16} />
          <span>
            <b>Poin bisa kedaluwarsa.</b> Poin hanya berlaku selama periode berjalan. Tukarkan sebelum 31 Des 2026,
            23.59 WIB agar tidak hangus.
          </span>
        </p>
      </aside>
      <section className="ph-list">
        {ledger.map((row, index) => (
          <div className="ph-row" key={`${row.date}-${index}`}>
            <span className={row.delta < 0 ? 'ph-dot out' : 'ph-dot'}>
              <Icon name={row.delta < 0 ? 'gift' : 'check'} size={18} strokeWidth={row.delta < 0 ? 1.8 : 2.4} />
            </span>
            <div>
              <strong>{row.title}</strong>
              <span>{row.detail}</span>
              <small>{row.date}</small>
            </div>
            <div className="ph-amount">
              <b className={row.delta < 0 ? 'out' : ''}>
                {row.delta > 0 ? '+' : '−'}
                {Math.abs(row.delta)}
              </b>
              <small>Sisa {row.balance}</small>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

const notifSettings = [
  ['verifikasi', 'Status setoran', 'Saat setoran dicatat petugas mitra dan poin masuk', true],
  ['poin', 'Poin masuk dan ditukar', 'Saat poin bertambah atau berhasil ditukar', true],
  ['kirim', 'Pengiriman hadiah', 'Status pengajuan dan pengiriman hadiah', true],
  ['peringkat', 'Peringkat dan periode', 'Perubahan peringkat dan penutupan periode', false],
  ['event', 'Event dan promo GladiPoint', 'Informasi event yang sedang berjalan', true],
  ['wa', 'Kirim juga lewat WhatsApp', 'Notifikasi penting dikirim ke nomor Anda', false],
] as const

const notifHistory = [
  { icon: 'check', title: 'Setoran BSO-000002 berhasil', detail: '+21 poin sudah masuk ke akun Anda', time: '5 Nov, 10.15 WIB', fresh: true },
  { icon: 'check', title: 'Setoran BSO-000001 berhasil', detail: '+41 poin sudah masuk ke akun Anda', time: '4 Nov, 09.27 WIB', fresh: true },
  { icon: 'gift', title: 'Poin berhasil ditukar', detail: 'Phonska Cair 250ml · −600 poin', time: '20 Okt, 14.05 WIB', fresh: false },
  { icon: 'check', title: 'Setoran berhasil', detail: '+33 poin sudah masuk ke akun Anda', time: '18 Okt, 10.05 WIB', fresh: false },
  { icon: 'trophy', title: 'Bonus event GladiPoint', detail: '+567 poin bonus bergabung', time: '25 Sep, 09.00 WIB', fresh: false },
]

function NotificationPage({ activities, onBack }: { activities: Activity[]; onBack: () => void }) {
  const [tab, setTab] = useState<'info' | 'setting'>('info')
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(notifSettings.map(([key, , , on]) => [key, on])),
  )
  const session = activities
    .filter((item) => item.kind === 'tukar')
    .map((item) => ({
      icon: 'gift',
      title: 'Poin berhasil ditukar',
      detail: `${item.amount} · ${item.points.replace('-', '−')}`,
      time: 'Baru saja',
      fresh: true,
    }))
  const list = [...session, ...notifHistory]

  return (
    <main className="page gladi-page">
      <Header title="Notifikasi" onBack={onBack} />
      <div className="act-tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'info'} className={tab === 'info' ? 'active' : ''} onClick={() => setTab('info')}>
          <Icon name="bell" size={16} /> Info
        </button>
        <button role="tab" aria-selected={tab === 'setting'} className={tab === 'setting' ? 'active' : ''} onClick={() => setTab('setting')}>
          <Icon name="sliders" size={16} /> Pengaturan
        </button>
      </div>

      {tab === 'info' ? (
        <section className="nt-list">
          {list.map((item, index) => (
            <div className="nt-row" key={`${item.title}-${index}`}>
              <span className={`nt-icon ${item.icon}`}>
                <Icon name={item.icon} size={18} strokeWidth={item.icon === 'check' ? 2.4 : 1.8} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
                <small>{item.time}</small>
              </div>
              {item.fresh && <i className="nt-dot" aria-label="Baru" />}
            </div>
          ))}
        </section>
      ) : (
        <section className="nt-settings">
          {notifSettings.map(([key, title, desc]) => (
            <div className="nt-set" key={key}>
              <div>
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
              <button
                role="switch"
                aria-checked={enabled[key]}
                aria-label={title}
                className={enabled[key] ? 'switch on' : 'switch'}
                onClick={() => setEnabled((value) => ({ ...value, [key]: !value[key] }))}
              >
                <i />
              </button>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

function GladiPoint({
  onBack,
  points,
  activities,
  redemptions,
  productions,
  pickups,
  onRedeem,
  account,
  setAccount,
  photo,
  setPhoto,
}: {
  onBack: () => void
  points: number
  activities: Activity[]
  redemptions: Redemption[]
  productions: Production[]
  pickups: Pickup[]
  onRedeem: (reward: { name: string; cost: number }) => string
  account: Account
  setAccount: (account: Account) => void
  photo: string | null
  setPhoto: (photo: string | null) => void
}) {
  const [view, setView] = useState<GladiView>('home')
  const [redeeming, setRedeeming] = useState<Reward | null>(null)
  const [redeemed, setRedeemed] = useState<{ name: string; id: string } | null>(null)
  const [hadiahTab, setHadiahTab] = useState<'hadiah' | 'riwayat'>('hadiah')
  const myRedemptions = redemptions.filter((item) => item.code === 'GP-00001').map(redemptionActivity)
  // Stok mitra periode berjalan: angka yang sama dengan Stok Tersedia di role Mitra.
  const stock = mitraSummary(periodOf(TODAY), productions, pickups)

  const [detail, setDetail] = useState<Reward | null>(null)
  const [unread, setUnread] = useState(true)
  const [partnerDetail, setPartnerDetail] = useState(false)
  const [actTab, setActTab] = useState<'bso' | 'hadiah'>('bso')
  const [query, setQuery] = useState('')
  const [sheet, setSheet] = useState<'qr' | null>(null)
  const [qrVersion, setQrVersion] = useState(1)

  // Navbar bawah: Aktivitas, QR Member (tengah), Hadiah. Tap menu aktif kembali ke beranda.
  const gladiNav = (
    <nav className="mt-nav gp-nav" aria-label="Navigasi GladiPoint">
      {(
        [
          ['aktivitas', 'activity', 'Aktivitas'],
          ['hadiah', 'gift', 'Hadiah'],
        ] as const
      ).map(([key, icon, label]) => (
        <button
          key={key}
          className={`${view === key ? 'active' : ''}${key === 'hadiah' ? ' right' : ''}`}
          onClick={() => setView(view === key ? 'home' : key)}
          aria-current={view === key ? 'page' : undefined}
        >
          <Icon name={icon} size={22} />
          <span>{label}</span>
        </button>
      ))}
      <button className="mt-nav-fab" onClick={() => setSheet('qr')} aria-label="Tampilkan QR Member">
        <Icon name="qr" size={26} strokeWidth={2.2} />
      </button>
    </nav>
  )
  const gladiQr =
    sheet === 'qr' ? (
      <QrSheet
        version={qrVersion}
        onRegenerate={() => setQrVersion((value) => value + 1)}
        onClose={() => setSheet(null)}
      />
    ) : null

  if (view === 'notifikasi') {
    return <NotificationPage activities={activities} onBack={() => setView('home')} />
  }

  if (view === 'poin') {
    return <PointsHistory points={points} activities={activities} onBack={() => setView('home')} />
  }

  if (view === 'mitra') {
    return (
      <PartnerPage
        detail={partnerDetail}
        onOpen={() => setPartnerDetail(true)}
        onBack={() => (partnerDetail ? setPartnerDetail(false) : setView('home'))}
      />
    )
  }

  if (view === 'peringkat') return <Leaderboard onBack={() => setView('home')} />

  if (view === 'aktivitas') {
    const q = query.trim().toLowerCase()
    const inTab = actTab === 'bso' ? activities.filter((item) => item.kind === 'setoran') : myRedemptions
    const shown = inTab.filter(
      (item) =>
        !q ||
        [item.ref, item.title, item.name, item.member, item.amount].some((field) =>
          field.toLowerCase().includes(q),
        ),
    )
    return (
      <>
      <main className="page gladi-page has-nav">
        <Header title="Aktivitas" subtitle="Setoran dan penukaran poin" onBack={() => setView('home')} />
        <div className="act-tabs" role="tablist">
          {(
            [
              ['bso', 'BSO'],
              ['hadiah', 'Hadiah'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={actTab === key}
              className={actTab === key ? 'active' : ''}
              onClick={() => setActTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="act-search">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari kode BSO, nama, atau kode member"
            aria-label="Cari aktivitas"
          />
        </label>
        <section className="act-list">
          {shown.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
          {shown.length === 0 && (
            <div className="act-empty">
              <Icon name={actTab === 'bso' ? 'clipboard' : 'gift'} size={36} />
              <strong>{q ? 'Tidak ditemukan' : actTab === 'bso' ? 'Belum ada setoran' : 'Belum ada penukaran'}</strong>
              <span>
                {q
                  ? 'Coba kata kunci lain.'
                  : actTab === 'bso'
                    ? 'Setoran Anda akan muncul di sini.'
                    : 'Penukaran hadiah Anda akan muncul di sini.'}
              </span>
            </div>
          )}
        </section>
      </main>
      {gladiNav}
      {gladiQr}
      </>
    )
  }

  if (view === 'hadiah') {
    return (
      <>
        <main className="page gladi-page has-nav">
          <Header title="Hadiah" subtitle={`Poin Anda ${points}`} onBack={() => setView('home')} />
          <div className="act-tabs" role="tablist">
            {(
              [
                ['hadiah', 'Hadiah'],
                ['riwayat', 'Riwayat penukaran'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={hadiahTab === key}
                className={hadiahTab === key ? 'active' : ''}
                onClick={() => setHadiahTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
          {hadiahTab === 'hadiah' ? (
            <section className="reward-grid">
              {rewards.map((reward) => (
                <RewardCard
                  key={reward.name}
                  reward={reward}
                  points={points}
                  onClick={() => setDetail(reward)}
                  onRedeem={setRedeeming}
                />
              ))}
            </section>
          ) : (
            <section className="act-list">
              {myRedemptions.map((item) => (
                <ActivityCard key={item.id} item={item} />
              ))}
              {myRedemptions.length === 0 && (
                <div className="act-empty">
                  <Icon name="gift" size={36} />
                  <strong>Belum ada penukaran</strong>
                  <span>Penukaran hadiah Anda akan muncul di sini.</span>
                </div>
              )}
            </section>
          )}
        </main>
        {gladiNav}
        {gladiQr}
        {detail && (
          <div className="modal-backdrop" onClick={() => setDetail(null)}>
            <section className="promo-sheet gp-sheet rw-sheet" onClick={(event) => event.stopPropagation()}>
              <button className="sheet-handle" onClick={() => setDetail(null)} aria-label="Tutup" />
              <div className="rw-photo">
                {detail.img && <img src={detail.img} alt={detail.name} />}
              </div>
              <div className="rw-head">
                <h2>{detail.name}</h2>
                <span>Stok {detail.stock}</span>
              </div>
              <p className="rw-cost">
                <b>{fmt(detail.cost)}</b> poin
              </p>
              <p className="rw-desc">{detail.desc}</p>
              <div className="reward-bar" aria-hidden="true">
                <i style={{ width: `${Math.min(points / detail.cost, 1) * 100}%` }} />
              </div>
              <section className="rw-info">
                <h3>
                  <Icon name="pin" size={20} /> Pengambilan hadiah
                </h3>
                <p>
                  Hadiah diambil langsung di tempat mitra, {MY_MITRA}. Tunjukkan kode transaksi dan kode member Anda
                  kepada mitra.
                </p>
              </section>
              <section className="rw-info">
                <h3>Ketentuan</h3>
                <ul>
                  <li>
                    <Icon name="users" size={20} />
                    <span>Diambil di mitra. Mitra mengonfirmasi dengan foto, lalu waktu penerimaan tercatat di Riwayat penukaran.</span>
                  </li>
                  <li>
                    <Icon name="info" size={20} />
                    <span>Pengajuan dapat dibatalkan selama hadiah belum diambil; poin dikembalikan penuh.</span>
                  </li>
                  <li>
                    <Icon name="info" size={20} />
                    <span>Berlaku sampai 31 Des 2026, 23.59 WIB.</span>
                  </li>
                </ul>
              </section>
              <div className="rw-foot">
              {points >= detail.cost ? (
                <button
                  className="rw-cta"
                  onClick={() => {
                    setRedeeming(detail)
                    setDetail(null)
                  }}
                >
                  Tukarkan poin Anda
                </button>
              ) : (
                <>
                  <aside className="question-example gp-warning rw-short" role="status">
                    <strong>
                      <Icon name="info" size={18} /> Poin Anda belum cukup
                    </strong>
                    <p>
                      Kurang {fmt(detail.cost - points)} poin lagi. Yuk semangat lagi kumpulkan poinmu!
                    </p>
                  </aside>
                  <button className="rw-cta" disabled>
                    Tukarkan poin Anda
                  </button>
                </>
              )}
              </div>
            </section>
          </div>
        )}
        {redeeming && (
          <div className="modal-backdrop" onClick={() => setRedeeming(null)}>
            <section className="promo-sheet gp-sheet" onClick={(event) => event.stopPropagation()}>
              <button className="sheet-handle" onClick={() => setRedeeming(null)} aria-label="Tutup" />
              <h2>Tukar {fmt(redeeming.cost)} poin?</h2>
              <p>
                {redeeming.name} akan ditukar dengan {fmt(redeeming.cost)} poin. Sisa poin Anda{' '}
                {points - redeeming.cost}.
              </p>
              <div className="gp-confirm sheet-confirm">
                <div>
                  <button onClick={() => setRedeeming(null)}>Batal</button>
                  <button
                    className="strong"
                    onClick={() => {
                      const id = onRedeem(redeeming)
                      setRedeemed({ name: redeeming.name, id })
                      setRedeeming(null)
                    }}
                  >
                    Ya, tukar
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
        {redeemed && (
          <div className="modal-backdrop" onClick={() => setRedeemed(null)}>
            <section className="promo-sheet gp-sheet rw-done" onClick={(event) => event.stopPropagation()}>
              <button className="sheet-handle" onClick={() => setRedeemed(null)} aria-label="Tutup" />
              <span className="rw-done-icon">
                <Icon name="check" size={28} strokeWidth={3} />
              </span>
              <h2>Penukaran berhasil</h2>
              <p>
                {redeemed.name} · kode <b>{redeemed.id}</b>
              </p>
              <section className="rw-info">
                <h3>
                  <Icon name="pin" size={20} /> Ambil hadiah di mitra
                </h3>
                <p>
                  Datang ke {MY_MITRA} dan tunjukkan kode transaksi serta kode member GP-00001. Setelah mitra
                  mengonfirmasi dengan foto, waktu penerimaan hadiah tercatat di Riwayat penukaran.
                </p>
              </section>
              <div className="gp-confirm sheet-confirm">
                <div>
                  <button onClick={() => setRedeemed(null)}>Tutup</button>
                  <button
                    className="strong"
                    onClick={() => {
                      setRedeemed(null)
                      setHadiahTab('riwayat')
                    }}
                  >
                    Lihat riwayat
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </>
    )
  }

  if (view === 'kontribusi') {
    return (
      <main className="page gladi-page">
        <Header title="Kontribusi" subtitle="Riwayat setoran dan poin" onBack={() => setView('home')} />
        <section className="gp-sum">
          <div>
            <span>Total kontribusi</span>
            <strong>30,5 kg</strong>
          </div>
          <div>
            <span>Poin dari setoran</span>
            <strong>74</strong>
          </div>
        </section>
        {contributions.map((group) => (
          <section className="gp-month" key={group.month}>
            <div className="gp-month-head">
              <h2>{group.month}</h2>
              <span>
                {group.kg} · +{group.points} poin
              </span>
            </div>
            {group.items.map((item) => (
              <div className="act-card" key={item.submitted}>
                <div className="act-main">
                  <div className="act-head">
                    <strong>{item.place}</strong>
                  </div>
                  <dl className="time-list">
                    <div>
                      <dt>Disetor</dt>
                      <dd>{item.submitted}</dd>
                    </div>
                  </dl>
                </div>
                <div className="act-side">
                  <b>{item.kg}</b>
                  <span>+{item.points} poin</span>
                </div>
              </div>
            ))}
          </section>
        ))}
      </main>
    )
  }

  if (view === 'akun') {
    return (
      <AccountPage
        account={account}
        setAccount={setAccount}
        photo={photo}
        setPhoto={setPhoto}
        title="Profil Saya"
        onBack={() => setView('home')}
      />
    )
  }

  return (
    <>
      <main className="page gladi-page gp-home has-nav">
        <header className="gp-top">
          <button className="icon-button" onClick={onBack} aria-label="Kembali ke AgroFertile">
            <Icon name="back" />
          </button>
          <div className="gp-brand">
            <img src={`${BASE}assets/gladipoint-logo.png`} alt="GladiPoint" />
            <span>Bersama untuk Pertanian Lebih Baik</span>
          </div>
          <button
            className="gp-bell"
            aria-label="Notifikasi"
            onClick={() => {
              setUnread(false)
              setView('notifikasi')
            }}
          >
            <Icon name="bell" size={22} />
            {unread && <i className="bell-dot" />}
          </button>
          <button className="avatar gp-avatar" onClick={() => setView('akun')} aria-label="Profil Saya">
            {photo ? <img src={photo} alt="" /> : initialsOf(account.name)}
          </button>
        </header>

        <section
          className="gp-card"
          role="button"
          tabIndex={0}
          onClick={() => setView('poin')}
          onKeyDown={(event) => event.key === 'Enter' && setView('poin')}
          aria-label="Lihat riwayat poin"
        >
          <svg className="gp-deco deco-a" viewBox="0 0 120 160" aria-hidden="true">
            <path d="M110 6C40 10 6 52 8 108c1 26 18 46 44 46 52 0 62-72 58-148z" />
            <path className="vein" d="M104 14C70 50 40 90 22 146" />
          </svg>
          <svg className="gp-deco deco-b" viewBox="0 0 120 160" aria-hidden="true">
            <path d="M110 6C40 10 6 52 8 108c1 26 18 46 44 46 52 0 62-72 58-148z" />
          </svg>
          <div className="gp-card-top">
            <span className="gp-tag">Member Gladi</span>
            <strong>GP-00001</strong>
            <span className="gp-more">
              Riwayat poin <Icon name="chevron" size={14} />
            </span>
          </div>
          <div className="gp-card-bottom">
            <div className="gp-points">
              <span className="gp-coin">
                <Icon name="sparkle" size={18} strokeWidth={2.2} />
              </span>
              <div>
                <b>{points}</b>
                <span>poin tersedia</span>
              </div>
            </div>
            <button
              onClick={(event) => {
                event.stopPropagation()
                setSheet('qr')
              }}
            >
              <Icon name="qr" size={20} />
              <span>Tampilkan QR</span>
            </button>
          </div>
          <button
            className="gp-contrib"
            onClick={(event) => {
              event.stopPropagation()
              setView('kontribusi')
            }}
          >
            <span className="gp-contrib-icon">
              <Icon name="weight" size={20} />
            </span>
            <span className="gp-contrib-text">
              <small>Total kontribusi</small>
              <strong>30,5 kg</strong>
            </span>
            <em>20,5 kg bulan ini</em>
            <Icon name="chevron" size={16} />
          </button>
        </section>

        <section className="gp-menu" aria-label="Menu GladiPoint">
          {gladiMenus.map((item) => (
            <button key={item.view} onClick={() => setView(item.view)}>
              <span className="gp-menu-icon">
                <Icon name={item.icon} size={22} />
                {item.badge && <i>{item.badge}</i>}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </section>


        <section className="gp-activity">
          <div className="section-heading">
            <h2>Aktivitas</h2>
            <button onClick={() => setView('aktivitas')}>Lihat semua</button>
          </div>
          <ActivityCard item={activities[0]} onClick={() => setView('aktivitas')} />
        </section>

        <section className="gp-stock">
          <div className="gp-stock-head">
            <h2>Stok kompos mitra</h2>
          </div>
          <div className="gp-stock-items">
            <div>
              <span className="gp-stock-icon">
                <Icon name="sprout" size={20} />
              </span>
              <p>
                <strong>{idNumber(stock.tersedia)} kg</strong>
                <small>Kompos siap diambil</small>
              </p>
            </div>
            <div>
              <span className="gp-stock-icon">
                <Icon name="drop" size={20} />
              </span>
              <p>
                <strong>{idNumber(stock.nocTersedia)} L</strong>
                <small>Nutrisi Organik Cair siap diambil</small>
              </p>
            </div>
          </div>
          <small className="gp-stock-note">
            {MY_MITRA} ·{' '}
            {stock.lastTersedia
              ? `Update terakhir ${shortDate(stock.lastTersedia)} ${stock.lastTersedia.slice(0, 4)}`
              : 'Belum ada data'}
          </small>
        </section>

      </main>

      {gladiNav}
      {gladiQr}

    </>
  )
}

function Groovi() {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function submit() {
    if (!message.trim()) return
    setSent(true)
    setMessage('')
  }

  return (
    <main className="page tool-page">
      <Header title="GROOVI" subtitle="Groo Virtual Intelligence" />
      <section className="chat-empty">
        <div className="bot">▣</div>
        <h2>{sent ? 'Pertanyaan Anda sudah dikirim' : 'Ada yang bisa dibantu?'}</h2>
      </section>
      <aside className="question-example">
        <strong>ⓘ &nbsp; Contoh Pertanyaan Rekomendasi Pupuk</strong>
        <p>
          “Berikan rekomendasi pupuk untuk tanaman padi di lahan sawah dengan kondisi tanah N
          Kurang, P Kurang, dan K Sedang.”
        </p>
      </aside>
      <div className="chat-input">
        <button aria-label="Pilih gambar">
          <Icon name="image" />
        </button>
        <input
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
            setSent(false)
          }}
          onKeyDown={(event) => event.key === 'Enter' && submit()}
          placeholder="Tanya GROOVI..."
          aria-label="Pertanyaan untuk GROOVI"
        />
        <button className="send-button" onClick={submit} aria-label="Kirim pertanyaan">
          <Icon name="send" size={28} />
        </button>
      </div>
    </main>
  )
}

type Role = 'Agroman' | 'Agronomis' | 'Surveyor'

const contacts: { name: string; role: Role; region: string; areas: string; phone: string; match?: boolean }[] = [
  { name: 'Sulton Dzul Fiqar', role: 'Agroman', region: 'Jawa Timur', areas: 'Kabupaten Bojonegoro, Kabupaten Lamongan, Kabupaten Tuban', phone: '6281234500001', match: true },
  { name: 'Rina Kartika', role: 'Agronomis', region: 'Jawa Timur', areas: 'Kabupaten Lamongan, Kabupaten Gresik, Kabupaten Bojonegoro', phone: '6281234500011', match: true },
  { name: 'Bagus Prasetyo', role: 'Surveyor', region: 'Jawa Timur', areas: 'Kabupaten Lamongan, Kabupaten Tuban, Kabupaten Gresik', phone: '6281234500021', match: true },
  { name: 'Windu Ari Wibowo', role: 'Agroman', region: 'Jawa Timur', areas: 'Kabupaten Blitar, Kabupaten Kediri, Kabupaten Tulungagung', phone: '6281234500002' },
  { name: 'Made Ari', role: 'Agroman', region: 'Bali, Nusa Tenggara Barat, Nusa Tenggara Timur', areas: '', phone: '6281234500003' },
  { name: 'Aries Dwi Setiawan', role: 'Agroman', region: 'Jawa Timur', areas: 'Kabupaten Probolinggo, Kabupaten Pasuruan, Kabupaten Lumajang', phone: '6281234500004' },
  { name: 'Farid Mudzakir', role: 'Agroman', region: 'Jawa Tengah', areas: 'Kabupaten Semarang, Kabupaten Demak, Kabupaten Kudus', phone: '6281234500005' },
  { name: 'Hendra Gunawan', role: 'Agronomis', region: 'Jawa Timur', areas: 'Kabupaten Blitar, Kabupaten Malang, Kabupaten Kediri', phone: '6281234500012' },
  { name: 'Dewi Lestari', role: 'Agronomis', region: 'Jawa Barat', areas: 'Kabupaten Karawang, Kabupaten Subang, Kabupaten Indramayu', phone: '6281234500013' },
  { name: 'Yoga Pratama', role: 'Surveyor', region: 'Jawa Timur', areas: 'Kabupaten Probolinggo, Kabupaten Pasuruan, Kabupaten Jember', phone: '6281234500022' },
  { name: 'Maya Sari', role: 'Surveyor', region: 'Sulawesi Selatan', areas: 'Kabupaten Bone, Kabupaten Wajo, Kabupaten Sidrap', phone: '6281234500023' },
]

type Contact = (typeof contacts)[number]

function Consultation({ onBack }: { onBack: () => void }) {
  const [picked, setPicked] = useState<Contact | null>(null)
  const [role, setRole] = useState<'Semua' | Role>('Semua')
  const visible = contacts.filter((item) => role === 'Semua' || item.role === role)
  const top = visible.filter((item) => item.match)
  const others = visible.filter((item) => !item.match)

  const row = (item: Contact) => (
    <>
      <span className="ag-avatar">
        <Icon name="user" size={26} strokeWidth={2} />
      </span>
      <div className="ag-info">
        <strong>{item.name}</strong>
        <span className={`role-pill ${item.role.toLowerCase()}`}>{item.role}</span>
        <span className="ag-region">
          <Icon name="pin" size={15} />
          {item.region}
        </span>
        {item.areas && <small>{item.areas}</small>}
      </div>
      <Icon name="chevron" size={18} />
    </>
  )

  return (
    <main className="konsul-page">
      <header className="konsul-header">
        <button className="icon-button" onClick={onBack} aria-label="Kembali">
          <Icon name="back" />
        </button>
        <div>
          <h1>Konsultasi Layanan</h1>
          <p>Hubungi tim terkait pemesanan drone</p>
        </div>
      </header>

      <div className="konsul-body">
        <div className="konsul-info">
          <Icon name="info" size={20} />
          <span>Menampilkan agroman, agronomis, dan surveyor yang sesuai dengan lokasi Anda.</span>
        </div>

        <div className="role-tabs" role="tablist" aria-label="Filter peran">
          {(['Semua', 'Agroman', 'Agronomis', 'Surveyor'] as const).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={role === item}
              className={role === item ? 'active' : ''}
              onClick={() => setRole(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {top.length > 0 && (
          <>
            <h2>Rekomendasi Untuk Anda</h2>
            <div className="ag-matches">
              {top.map((item) => (
                <div className="ag-match" key={item.name}>
                  <div className="ag-match-tag">
                    <span>
                      <Icon name="check" size={13} strokeWidth={3} />
                    </span>
                    Sesuai dengan Lokasi Anda
                  </div>
                  <button className="ag-row" onClick={() => setPicked(item)}>
                    {row(item)}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {others.length > 0 && (
          <>
            <h2 className="second">Pilihan Lainnya</h2>
            <div className="ag-list">
              {others.map((item) => (
                <button className="ag-row card" key={item.name} onClick={() => setPicked(item)}>
                  {row(item)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {picked && (
        <div className="modal-backdrop" onClick={() => setPicked(null)}>
          <section className="promo-sheet gp-sheet" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setPicked(null)} aria-label="Tutup" />
            <div className="ag-sheet-head">
              <span className="ag-avatar">
                <Icon name="user" size={26} strokeWidth={2} />
              </span>
              <div>
                <h2>{picked.name}</h2>
                <p>
                  {picked.role} · {picked.region}
                </p>
              </div>
            </div>
            {picked.areas && <p className="ag-sheet-areas">Wilayah: {picked.areas}</p>}
            <a
              className="pt-btn primary"
              href={`https://wa.me/${picked.phone}?text=${encodeURIComponent(`Halo, saya ingin berkonsultasi dengan ${picked.role} terkait pemesanan drone Petro Spring.`)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="chat" size={20} /> Hubungi via WhatsApp
            </a>
          </section>
        </div>
      )}
    </main>
  )
}

function Spring({ onBack, onConsult }: { onBack: () => void; onConsult: () => void }) {
  return (
    <main className="page spring-page">
      <Header title="Petro Spring" subtitle="Sewa drone untuk pertanian" onBack={onBack} />
      <section className="spring-hero">
        <img src={`${BASE}assets/drone-hero.jpg`} alt="Drone untuk pemupukan pertanian" />
        <div>
          <h2>Tingkatkan Produktivitas Pertanian Anda</h2>
          <p>Sewa drone untuk penyebaran pupuk lebih efisien dan optimal.</p>
        </div>
      </section>
      <section className="service-grid">
        <button className="primary-service">
          <Icon name="drone" size={40} />
          <strong>Layanan Drone</strong>
          <span>Pesan drone untuk pertanian</span>
        </button>
        <button onClick={onConsult}>
          <Icon name="headset" size={40} />
          <strong>Konsultasi</strong>
          <span>Hubungi agroman untuk konsultasi</span>
        </button>
      </section>
      <section className="history">
        <div className="section-heading">
          <h2>Riwayat Pesanan</h2>
          <button>Selengkapnya</button>
        </div>
        <div className="empty-card">
          <Icon name="receipt" size={50} />
          <h3>Belum Ada Riwayat</h3>
          <p>Pesanan drone Anda akan muncul di sini.</p>
        </div>
      </section>
    </main>
  )
}

const profileRows = [
  ['area', 'Luas Lahan', '2.00 Hektar'],
  ['crop', 'Komoditas Utama', 'Padi'],
  ['layers', 'Jenis Pemupukan', 'Pupuk Tunggal'],
  ['leaf', 'Jenis Pertanian', 'Pangan'],
]

function LandProfile({ onBack }: { onBack: () => void }) {
  return (
    <main className="page profile-page">
      <header className="profile-header">
        <button className="icon-button back" onClick={onBack} aria-label="Kembali">
          <Icon name="back" />
        </button>
        <h1>Detail Profil Lahan</h1>
        <button>Edit</button>
      </header>
      <div className="map-placeholder" role="img" aria-label="Peta lokasi lahan di Lamongan">
        <div className="map-roads" />
        <div className="map-label">Lamongan</div>
        <div className="map-pin">
          <Icon name="pin" size={46} />
        </div>
      </div>
      <section className="profile-card">
        {profileRows.map(([icon, label, value]) => (
          <div className="profile-row" key={label}>
            <Icon name={icon} size={28} />
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </section>
      <section className="profile-card compact">
        <div className="profile-row">
          <Icon name="sparkle" size={28} />
          <div>
            <span>Pengalaman Bertani</span>
            <strong>2 Tahun</strong>
          </div>
        </div>
        <div className="profile-row">
          <Icon name="leaf" size={28} />
          <div>
            <span>Jenis Irigasi</span>
            <strong>Manual</strong>
          </div>
        </div>
      </section>
    </main>
  )
}

function BottomNav({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  const items: [Tab, string, string][] = [
    ['home', 'home', 'Beranda'],
    ['groovi', 'sparkle', 'GROOVI'],
    ['konsultasi', 'headset', 'Konsultasi'],
    ['profile', 'user', 'Profil'],
  ]
  const isActive = (key: Tab) =>
    tab === key || (key === 'home' && (tab === 'gladipoint' || tab === 'spring'))

  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {items.map(([key, icon, label]) => (
        <button
          key={key}
          className={isActive(key) ? 'active' : ''}
          onClick={() => setTab(key)}
          aria-current={isActive(key) ? 'page' : undefined}
        >
          <span className="nav-icon">
            <Icon name={icon} size={27} />
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

type MitraTab = 'tersedia' | 'hadiah' | 'peringkat' | 'gladiator' | 'grafik' | 'ringkasan' | 'bso' | 'member' | 'produksi' | 'pengambilan' | 'lainnya'

const mitraNav: [MitraTab, string, string][] = [
  ['ringkasan', 'home', 'Ringkasan'],
  ['bso', 'recycle', 'BSO'],
  ['member', 'users', 'Member penyetor'],
  ['produksi', 'sprout', 'Produksi'],
  ['pengambilan', 'truck', 'Pengambilan'],
  ['lainnya', 'more', 'Lainnya'],
]

type MitraStat = { bso: number; jadi: number; diambil: number; tersedia: number; noc: number }

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const mitraYears = [2026, 2027]
// Data contoh BSO (kg) Jan-Nov 2026; bulan setelahnya belum ada data.
const mitraBso = [420, 560, 610, 780, 940, 1120, 1350, 1480, 1720, 2150, 1860]

const mitraPeriods: Record<string, MitraStat> = Object.fromEntries(
  mitraYears.flatMap((year) =>
    monthNames.map((name, index) => {
      const bso = year === 2026 ? (mitraBso[index] ?? 0) : 0
      const jadi = Math.round(bso * 0.4)
      const diambil = Math.round(jadi * 0.75)
      return [`${name} ${year}`, { bso, jadi, diambil, tersedia: jadi - diambil, noc: Math.round(bso * 0.06) }]
    }),
  ),
)

// ---- Produksi Mitra Kompos ----
type Production = { id: string; type: 'kompos' | 'noc'; amount: number; date: string; location: string; note: string }

const TODAY = '2026-11-05'
const mitraSites = ['PKG Cabang Bojonegoro', 'PKG Cabang Lamongan', 'PKG Cabang Tuban']
const pad2 = (value: number) => String(value).padStart(2, '0')

// Data contoh produksi: 4 catatan per bulan (tanggal 3, 10, 17, 24) sampai hari ini.
const seedProductions: Production[] = mitraBso.flatMap((bso, index) =>
  [3, 10, 17, 24].flatMap((day) => {
    const date = `2026-${pad2(index + 1)}-${pad2(day)}`
    if (date > TODAY) return []
    const base = { date, location: mitraSites[0], note: '' }
    return [
      { id: `k-${date}`, type: 'kompos' as const, amount: Math.round((bso * 0.4) / 4), ...base },
      { id: `n-${date}`, type: 'noc' as const, amount: Math.round((bso * 0.06) / 4), ...base },
    ]
  }),
)

const periodOf = (date: string) => `${monthNames[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`

function mitraSummary(period: string, records: Production[], pickups: Pickup[]) {
  const all = period === 'Semua bulan'
  const inPeriod = (item: Production) => all || periodOf(item.date) === period
  const total = (list: Production[], type: Production['type']) =>
    list.filter((item) => item.type === type && inPeriod(item)).reduce((sum, item) => sum + item.amount, 0)
  const jadi = total(records, 'kompos')
  const nocJadi = total(records, 'noc')
  const pickupIn = pickups.filter((item) => all || periodOf(item.date) === period)
  const diambil = pickupIn.reduce((sum, item) => sum + (item.kompos ?? 0), 0)
  const nocDiambil = pickupIn.reduce((sum, item) => sum + (item.noc ?? 0), 0)
  const bso = all
    ? Object.values(mitraPeriods).reduce((sum, item) => sum + item.bso, 0)
    : mitraPeriods[period].bso
  const latest = (list: Production[]) =>
    list.filter(inPeriod).reduce((max, item) => (item.date > max ? item.date : max), '')
  const lastProduksi = latest(records)
  const lastDiambil = pickupIn.reduce((max, item) => (item.date > max ? item.date : max), '')
  const lastTersedia = lastProduksi > lastDiambil ? lastProduksi : lastDiambil
  return {
    bso,
    jadi,
    diambil,
    tersedia: jadi - diambil,
    nocJadi,
    nocDiambil,
    nocTersedia: nocJadi - nocDiambil,
    lastProduksi,
    lastDiambil,
    lastTersedia,
  }
}

type TrendRange = 'harian' | 'mingguan' | 'bulanan' | 'tahunan' | 'custom'

const addDays = (iso: string, days: number) => {
  const date = new Date(`${iso}T00:00:00`)
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}
const shortDate = (iso: string) => `${Number(iso.slice(8, 10))} ${monthNames[Number(iso.slice(5, 7)) - 1]}`

type Pickup = {
  id: string
  date: string
  location: string
  kompos?: number
  noc?: number
  taker: string
  takerType: string
  purpose: string
  note: string
}

const purposes = ['Pertanian', 'Penghijauan', 'Demplot', 'Hadiah', 'Penjualan', 'Lainnya']
const takerTypes = ['Member', 'Petani', 'Kelompok tani', 'Instansi', 'Sekolah', 'Internal', 'Lainnya']
const seedTakers: [string, string][] = [
  ['Budi Santoso', 'Petani'],
  ['Kelompok Tani Makmur', 'Kelompok tani'],
  ['Siti Aminah', 'Member'],
  ['SDN 1 Kapas', 'Sekolah'],
  ['Dinas Pertanian', 'Instansi'],
  ['Tim Internal', 'Internal'],
]

// Data contoh pengambilan: sehari setelah setiap produksi contoh.
const seedPickups: Pickup[] = seedProductions
  .filter((item) => item.type === 'kompos')
  .map((item, index) => {
    const noc = seedProductions.find((other) => other.type === 'noc' && other.date === item.date)
    const [taker, takerType] = seedTakers[index % seedTakers.length]
    return {
      id: `p-${item.date}`,
      date: addDays(item.date, 1),
      location: item.location,
      kompos: Math.round(item.amount * 0.75),
      noc: Math.round((noc?.amount ?? 0) * 0.6),
      taker,
      takerType,
      purpose: purposes[index % 3],
      note: '',
    }
  })

function trendBuckets(range: TrendRange, custom: { from: string; to: string }) {
  const list: { label: string; start: string; end: string }[] = []
  if (range === 'harian') {
    for (let i = 13; i >= 0; i--) {
      const day = addDays(TODAY, -i)
      list.push({ label: String(Number(day.slice(8, 10))), start: day, end: day })
    }
  } else if (range === 'mingguan') {
    for (let i = 7; i >= 0; i--) {
      const end = addDays(TODAY, -7 * i)
      list.push({ label: shortDate(end), start: addDays(end, -6), end })
    }
  } else if (range === 'bulanan') {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(2026, 10 - i, 1)
      const key = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`
      list.push({ label: monthNames[date.getMonth()], start: `${key}-01`, end: `${key}-31` })
    }
  } else if (range === 'tahunan') {
    for (const year of [2025, 2026, 2027]) list.push({ label: String(year), start: `${year}-01-01`, end: `${year}-12-31` })
  } else {
    const { from, to } = custom
    if (!from || !to || from > to) return list
    const days = Math.round((new Date(`${to}T00:00:00`).getTime() - new Date(`${from}T00:00:00`).getTime()) / 86400000) + 1
    if (days <= 14) {
      for (let i = 0; i < days; i++) {
        const day = addDays(from, i)
        list.push({ label: String(Number(day.slice(8, 10))), start: day, end: day })
      }
    } else if (days <= 120) {
      for (let start = from; start <= to; start = addDays(start, 7)) {
        const end = addDays(start, 6) > to ? to : addDays(start, 6)
        list.push({ label: shortDate(start), start, end })
      }
    } else {
      for (let key = from.slice(0, 7); key <= to.slice(0, 7); ) {
        const [year, month] = key.split('-').map(Number)
        list.push({ label: monthNames[month - 1], start: `${key}-01` < from ? from : `${key}-01`, end: `${key}-31` > to ? to : `${key}-31` })
        key = month === 12 ? `${year + 1}-01` : `${year}-${pad2(month + 1)}`
      }
    }
  }
  return list
}

function ProductionChart({ records, type, range, custom, unit, chart, title }: {
  chart: 'batang' | 'garis'
  title?: string
  records: { type: string; amount: number; date: string }[]
  type: string
  range: TrendRange
  custom: { from: string; to: string }
  unit: string
}) {
  const buckets = trendBuckets(range, custom).map((bucket) => ({
    label: bucket.label,
    value: records
      .filter((item) => item.type === type && item.date >= bucket.start && item.date <= bucket.end)
      .reduce((sum, item) => sum + item.amount, 0),
  }))
  const peak = Math.max(...buckets.map((item) => item.value), 1)
  const peakIndex = buckets.findIndex((item) => item.value === peak)
  const total = buckets.reduce((sum, item) => sum + item.value, 0)
  const dense = buckets.length > 8

  return (
    <section className="mt-panel">
      <div className="mt-panel-head">
        <h2>{title ?? `Tren produksi ${type === 'kompos' ? 'kompos' : 'NOC'}`}</h2>
        <span className="mt-total">
          {idNumber(total)} {unit}
        </span>
      </div>
      {buckets.length === 0 ? (
        <p className="mt-hint">Pilih rentang tanggal yang valid.</p>
      ) : chart === 'batang' ? (
        <div
          className={`mt-bars ${dense ? 'twelve' : ''}`}
          style={{ gridTemplateColumns: `repeat(${buckets.length}, minmax(0, 1fr))` }}
        >
          {buckets.map((item, index) => (
            <div key={`${item.label}-${index}`}>
              <b>{!dense || index === peakIndex ? (item.value ? idNumber(item.value) : '') : ''}</b>
              <span
                className={index === peakIndex && item.value ? 'dark' : 'light'}
                style={{ height: `${Math.max((item.value / peak) * 100, 3)}%` }}
              />
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      ) : (
        (() => {
          const count = buckets.length
          const x = (index: number) => ((index + 0.5) / count) * 100
          const y = (value: number) => 100 - Math.max((value / peak) * 100, 2)
          const line = buckets.map((item, index) => `${x(index)},${y(item.value)}`).join(' ')
          return (
            <div className="mt-line">
              <div className="mt-line-plot">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <polygon points={`${x(0)},100 ${line} ${x(count - 1)},100`} className="area" />
                  <polyline points={line} className="stroke" vectorEffect="non-scaling-stroke" />
                </svg>
                {buckets.map((item, index) => {
                  const on = index === peakIndex && item.value > 0
                  return (
                    <i
                      key={`${item.label}-${index}`}
                      className={on ? 'dot on' : 'dot'}
                      style={{ left: `${x(index)}%`, top: `${y(item.value)}%` }}
                    >
                      {(on || (!dense && item.value > 0)) && <b>{idNumber(item.value)}</b>}
                    </i>
                  )
                })}
              </div>
              <div
                className="mt-line-labels"
                style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
              >
                {buckets.map((item, index) => (
                  <small key={`${item.label}-${index}`}>{item.label}</small>
                ))}
              </div>
            </div>
          )
        })()
      )}
    </section>
  )
}

function MitraPickup({
  pickups,
  records,
  onSave,
}: {
  pickups: Pickup[]
  records: Production[]
  onSave: (item: Pickup) => void
}) {
  const [products, setProducts] = useState<{ kompos: boolean; noc: boolean }>({ kompos: true, noc: false })
  const [location, setLocation] = useState(mitraSites[0])
  const [amounts, setAmounts] = useState({ kompos: '', noc: '' })
  const [taker, setTaker] = useState('')
  const [takerType, setTakerType] = useState(takerTypes[0])
  const [purpose, setPurpose] = useState(purposes[0])
  const [note, setNote] = useState('')
  const [notice, setNotice] = useState('')
  const [showAll, setShowAll] = useState(false)

  const availableKompos =
    records.filter((item) => item.type === 'kompos').reduce((sum, item) => sum + item.amount, 0) -
    pickups.reduce((sum, item) => sum + (item.kompos ?? 0), 0)
  const availableNoc =
    records.filter((item) => item.type === 'noc').reduce((sum, item) => sum + item.amount, 0) -
    pickups.reduce((sum, item) => sum + (item.noc ?? 0), 0)

  const parse = (value: string) => Number(value.replace(',', '.')) || 0
  const komposValue = products.kompos ? parse(amounts.kompos) : 0
  const nocValue = products.noc ? parse(amounts.noc) : 0
  const komposOver = komposValue > availableKompos
  const nocOver = nocValue > availableNoc
  const valid =
    (products.kompos || products.noc) &&
    (!products.kompos || komposValue > 0) &&
    (!products.noc || nocValue > 0) &&
    !komposOver &&
    !nocOver &&
    taker.trim().length > 0

  function toggle(key: 'kompos' | 'noc') {
    const next = { ...products, [key]: !products[key] }
    if (next.kompos || next.noc) setProducts(next)
  }

  function save() {
    if (!valid) return
    onSave({
      id: `u-${Date.now()}`,
      date: TODAY,
      location,
      kompos: products.kompos ? komposValue : undefined,
      noc: products.noc ? nocValue : undefined,
      taker: taker.trim(),
      takerType,
      purpose,
      note: note.trim(),
    })
    setNotice(`Pengambilan oleh ${taker.trim()} tercatat.`)
    setAmounts({ kompos: '', noc: '' })
    setTaker('')
    setNote('')
  }

  const history = pickups
    .map((item, index) => ({ item, index }))
    .sort((a, b) => b.item.date.localeCompare(a.item.date) || b.index - a.index)
    .map(({ item }) => item)
  const shown = showAll ? history : history.slice(0, 5)

  const amountField = (key: 'kompos' | 'noc', label: string, unit: string, available: number, over: boolean) => (
    <label className="mt-field">
      <span>{label}</span>
      <div className={`mt-input-unit ${over ? 'error' : ''}`}>
        <input
          inputMode="decimal"
          placeholder="0"
          value={amounts[key]}
          onChange={(event) => setAmounts({ ...amounts, [key]: event.target.value.replace(/[^0-9.,]/g, '') })}
        />
        <i>{unit}</i>
      </div>
      <small className={over ? 'mt-error' : 'mt-avail'}>
        {over ? 'Melebihi stok tersedia: ' : 'Stok tersedia: '}
        {idNumber(available)} {unit}
      </small>
    </label>
  )

  return (
    <>
      <section className="mt-panel">
        <h2>Catat pengambilan</h2>
        <div className="mt-stockbar" aria-label="Stok saat ini">
          <div>
            <span className="mt-stat-icon">
              <Icon name="sprout" size={18} />
            </span>
            <p>
              <small>Stok kompos</small>
              <strong>{idNumber(availableKompos)} kg</strong>
            </p>
          </div>
          <div>
            <span className="mt-stat-icon">
              <Icon name="drop" size={18} />
            </span>
            <p>
              <small>Stok NOC</small>
              <strong>{idNumber(availableNoc)} L</strong>
            </p>
          </div>
        </div>
        {notice && (
          <p className="mt-saved" role="status">
            <Icon name="check" size={16} strokeWidth={2.6} /> {notice}
          </p>
        )}
        <div className="mt-form">
          <div className="mt-field">
            <span>Produk</span>
            <div className="mt-chips" role="group" aria-label="Produk">
              {(
                [
                  ['kompos', 'Kompos (kg)'],
                  ['noc', 'NOC (L)'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={products[key]}
                  className={products[key] ? 'active' : ''}
                  onClick={() => toggle(key)}
                >
                  {products[key] && <Icon name="check" size={14} strokeWidth={3} />} {label}
                </button>
              ))}
            </div>
          </div>
          <label className="mt-field">
            <span>Lokasi</span>
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              {mitraSites.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          {products.kompos && amountField('kompos', 'Jumlah kompos (kg)', 'kg', availableKompos, komposOver)}
          {products.noc && amountField('noc', 'Jumlah NOC (L)', 'L', availableNoc, nocOver)}
          <label className="mt-field">
            <span>Nama pengambil</span>
            <input value={taker} onChange={(event) => setTaker(event.target.value)} placeholder="Nama lengkap atau lembaga" />
          </label>
          <label className="mt-field">
            <span>Jenis pengambil</span>
            <select value={takerType} onChange={(event) => setTakerType(event.target.value)}>
              {takerTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="mt-field">
            <span>Keperluan</span>
            <select value={purpose} onChange={(event) => setPurpose(event.target.value)}>
              {purposes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="mt-field">
            <span>
              Catatan <em>(opsional)</em>
            </span>
            <textarea rows={2} value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
          {(komposOver || nocOver) && (
            <p className="mt-error-box" role="alert">
              <Icon name="info" size={16} /> Jumlah melebihi stok tersedia, pengambilan tidak dapat disimpan.
            </p>
          )}
          <button className="mt-cta" disabled={!valid} onClick={save}>
            Simpan pengambilan
          </button>
        </div>
      </section>

      <section className="mt-panel">
        <div className="mt-panel-head">
          <h2>Riwayat pengambilan</h2>
          <span className="mt-total">{history.length} data</span>
        </div>
        <ul className="mt-recent">
          {shown.map((item) => (
            <li key={item.id}>
              <span className="mt-stat-icon">
                <Icon name="truck" size={20} />
              </span>
              <div>
                <strong>{item.taker}</strong>
                <small>
                  {item.takerType} · {item.purpose} · {shortDate(item.date)} {item.date.slice(0, 4)}
                </small>
                <small>
                  {[
                    item.kompos ? `Kompos ${idNumber(item.kompos)} kg` : '',
                    item.noc ? `NOC ${idNumber(item.noc)} L` : '',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  {' · '}
                  {item.location}
                </small>
                {item.note && <small>{item.note}</small>}
              </div>
            </li>
          ))}
        </ul>
        {history.length > 5 && (
          <button className="mt-more" onClick={() => setShowAll((value) => !value)}>
            {showAll ? 'Tampilkan lebih sedikit' : `Lihat semua (${history.length})`}
          </button>
        )}
      </section>
    </>
  )
}

type Usage = { id: string; type: 'cair' | 'padat'; amount: number; date: string; note: string }

// Data contoh pemakaian Gladiator: 4 catatan per bulan, cair (L) dan padat (kg).
const seedUsage: Usage[] = mitraBso.flatMap((_, index) =>
  [2, 9, 16, 23].flatMap((day, slot) => {
    const date = `2026-${pad2(index + 1)}-${pad2(day)}`
    if (date > TODAY) return []
    const base = { date, note: '' }
    return [
      { id: `uc-${date}`, type: 'cair' as const, amount: 6 + ((index * 3 + slot * 2) % 7), ...base },
      { id: `up-${date}`, type: 'padat' as const, amount: 15 + ((index * 5 + slot * 4) % 11), ...base },
    ]
  }),
)

function usageTotals(period: string, records: Usage[]) {
  const list = records.filter((item) => period === 'Semua bulan' || periodOf(item.date) === period)
  const sum = (type: Usage['type']) => list.filter((item) => item.type === type).reduce((total, item) => total + item.amount, 0)
  const last = list.reduce((max, item) => (item.date > max ? item.date : max), '')
  return { cair: sum('cair'), padat: sum('padat'), last }
}

// ---- Member penyetor & peringkat ----
type Member = { code: string; name: string; village: string }
type Deposit = { ref: string; code: string; date: string; kg: number; waste: string; points: number }

const memberNames = [
  'Demo Farmer', 'Budi Santoso', 'Siti Aminah', 'Slamet Riyadi', 'Wahyuni', 'Karno Wijaya',
  'Sri Rahayu', 'Joko Purnomo', 'Eko Prasetyo', 'Dewi Lestari', 'Agus Salim', 'Nur Hidayah',
  'Supriyadi', 'Tri Handayani', 'Mulyono', 'Lilik Suryani', 'Hadi Susanto', 'Rini Astuti',
]
const memberVillages = ['Kapas', 'Kedungadem', 'Dander', 'Balen', 'Sumberrejo', 'Trucuk']
const wasteTypes = ['Sampah basah', 'Sampah kebun', 'Sampah basah, Sampah kebun', 'Sampah kering']

const mitraMembers: Member[] = memberNames.map((name, index) => ({
  code: `GP-${String(index + 1).padStart(5, '0')}`,
  name,
  village: memberVillages[index % memberVillages.length],
}))

// Data contoh setoran BSO per member; total tiap bulan sama dengan BSO pada Ringkasan.
const mitraDeposits: Deposit[] = (() => {
  const round1 = (value: number) => Math.round(value * 10) / 10
  let seed = 7
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const list: Omit<Deposit, 'ref' | 'points'>[] = []
  const fixed: Deposit[] = [
    { ref: 'BSO-000001', code: 'GP-00001', date: '2026-11-04', kg: 12.5, waste: wasteTypes[2], points: 41 },
    { ref: 'BSO-000002', code: 'GP-00001', date: '2026-11-05', kg: 8, waste: wasteTypes[0], points: 21 },
  ]
  mitraBso.forEach((bso, month) => {
    const rest = month === 10 ? bso - 20.5 : bso
    const count = 9
    const weights = Array.from({ length: count }, () => 0.5 + next())
    const weightSum = weights.reduce((sum, value) => sum + value, 0)
    let used = 0
    for (let i = 0; i < count; i++) {
      const kg = i === count - 1 ? round1(rest - used) : round1((rest * weights[i]) / weightSum)
      used += kg
      const day = month === 10 ? 1 + Math.floor(next() * 5) : 2 + Math.floor(next() * 24)
      const member = mitraMembers[1 + Math.floor(next() * (mitraMembers.length - 1))]
      list.push({
        code: member.code,
        date: `2026-${pad2(month + 1)}-${pad2(day)}`,
        kg,
        waste: wasteTypes[Math.floor(next() * wasteTypes.length)],
      })
    }
  })
  const generated = list
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item, index) => ({ ...item, ref: `BSO-${String(101 + index).padStart(6, '0')}`, points: Math.round(item.kg * 3.28) }))
  return [...generated, ...fixed]
})()

// Peringkat antar mitra: BSO (kg) tiap mitra pada periode terpilih. Mitra ini memakai data BSO sesungguhnya.
const MY_MITRA = 'Mitra Bojonegoro Kanwil I'
const otherMitra: { name: string; area: string; factor: number }[] = [
  { name: 'Mitra Lamongan Kanwil II', area: 'Lamongan', factor: 1.42 },
  { name: 'Mitra Tuban Kanwil I', area: 'Tuban', factor: 1.28 },
  { name: 'Mitra Ngawi Kanwil I', area: 'Ngawi', factor: 1.14 },
  { name: 'Mitra Madiun Kanwil II', area: 'Madiun', factor: 0.93 },
  { name: 'Mitra Nganjuk Kanwil I', area: 'Nganjuk', factor: 0.84 },
  { name: 'Mitra Jombang Kanwil III', area: 'Jombang', factor: 0.71 },
  { name: 'Mitra Kediri Kanwil II', area: 'Kediri', factor: 0.62 },
  { name: 'Mitra Blitar Kanwil I', area: 'Blitar', factor: 0.51 },
  { name: 'Mitra Magetan Kanwil I', area: 'Magetan', factor: 0.43 },
  { name: 'Mitra Pacitan Kanwil I', area: 'Pacitan', factor: 0.35 },
  { name: 'Mitra Trenggalek Kanwil II', area: 'Trenggalek', factor: 0.27 },
]

function mitraRanking(period: string) {
  const months = period === 'Semua bulan' ? Object.keys(mitraPeriods) : [period]
  const mine = months.reduce((sum, key) => sum + (mitraPeriods[key]?.bso ?? 0), 0)
  return [
    { name: MY_MITRA, area: 'Bojonegoro', kg: mine, me: true },
    ...otherMitra.map((item, index) => ({
      name: item.name,
      area: item.area,
      kg: Math.round(months.reduce((sum, key) => sum + (mitraPeriods[key]?.bso ?? 0), 0) * item.factor * (1 + ((index * 7) % 5) / 100)),
      me: false,
    })),
  ]
    .filter((row) => row.kg > 0)
    .sort((a, b) => b.kg - a.kg)
}

const memberInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

function MitraMembers() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Member | null>(null)
  const needle = query.trim().toLowerCase()
  const rows = mitraMembers
    .filter((member) => !needle || member.name.toLowerCase().includes(needle) || member.code.toLowerCase().includes(needle))
    .map((member) => {
      const list = mitraDeposits.filter((item) => item.code === member.code)
      return { member, count: list.length, kg: list.reduce((sum, item) => sum + item.kg, 0) }
    })
  const history = open
    ? mitraDeposits.filter((item) => item.code === open.code).sort((a, b) => b.date.localeCompare(a.date) || b.ref.localeCompare(a.ref))
    : []

  return (
    <>
      <div className="mt-graph-head">
        <h1>Member penyetor</h1>
        <span className="mt-total">{mitraMembers.length} member</span>
      </div>
      <label className="mt-search">
        <Icon name="search" size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari nama atau kode member"
          aria-label="Cari member"
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="Hapus pencarian">
            Hapus
          </button>
        )}
      </label>

      <section className="mt-panel mt-list">
        {rows.length === 0 && <p className="mt-hint">Member tidak ditemukan.</p>}
        {rows.map(({ member, count, kg }) => (
          <button key={member.code} className="mt-member" onClick={() => setOpen(member)}>
            <span className="mt-avatar">{memberInitials(member.name)}</span>
            <span className="mt-member-info">
              <strong>{member.name}</strong>
              <small>
                {member.code} · {member.village}
              </small>
            </span>
            <span className="mt-member-kg">
              <strong>{idNumber(kg)} kg</strong>
              <small>{count} setoran</small>
            </span>
            <Icon name="chevron" size={16} />
          </button>
        ))}
      </section>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(null)}>
          <section className="promo-sheet gp-sheet mt-picker mt-scroll" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setOpen(null)} aria-label="Tutup" />
            <div className="mt-member-head">
              <span className="mt-avatar big">{memberInitials(open.name)}</span>
              <div>
                <h2>{open.name}</h2>
                <small>
                  {open.code} · {open.village}
                </small>
              </div>
            </div>
            <div className="mt-sheet-sum">
              <div>
                <small>Total BSO</small>
                <strong>{idNumber(history.reduce((sum, item) => sum + item.kg, 0))} kg</strong>
              </div>
              <div>
                <small>Total poin</small>
                <strong>{history.reduce((sum, item) => sum + item.points, 0)}</strong>
              </div>
            </div>
            <h3 className="mt-sub">Riwayat transaksi BSO</h3>
            <ul className="mt-recent">
              {history.map((item) => (
                <li key={item.ref}>
                  <span className="mt-stat-icon">
                    <Icon name="recycle" size={20} />
                  </span>
                  <div>
                    <strong>
                      {item.ref} · {idNumber(item.kg)} kg
                    </strong>
                    <small>
                      {shortDate(item.date)} {item.date.slice(0, 4)} · {item.waste}
                    </small>
                  </div>
                  <em className="mt-points">+{item.points} poin</em>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </>
  )
}

// ---- Stok tersedia: produksi dikurangi pengambilan ----
// Penukaran milik member -> kartu aktivitas (dipakai di Riwayat penukaran dan Aktivitas > Hadiah)
function redemptionActivity(item: Redemption): Activity {
  const member = mitraMembers.find((m) => m.code === item.code)
  return {
    id: item.id,
    kind: 'tukar',
    ref: item.id,
    status: item.received ? 'Diterima' : 'Menunggu diambil',
    title: 'Poin berhasil ditukar',
    meta: `Ditukar ${stamp(item.at)}`,
    note: item.received ? `Hadiah diterima ${stamp(item.received.at)}` : `Ambil hadiah di ${MY_MITRA}`,
    amount: item.reward,
    points: `-${fmt(item.cost)} poin`,
    name: member?.name ?? item.code,
    member: item.code,
  }
}

function MitraStock({
  data,
  period,
  onPick,
}: {
  data: ReturnType<typeof mitraSummary>
  period: string
  onPick: () => void
}) {
  const rows = [
    ['Hasil produksi', data.jadi, data.nocJadi],
    ['Stok diambil', data.diambil, data.nocDiambil],
    ['Stok tersedia', data.tersedia, data.nocTersedia],
  ] as const

  return (
    <>
      <div className="mt-graph-head">
        <h1>Stok tersedia</h1>
        <button className="mt-period light" onClick={onPick} aria-label="Pilih periode">
          <Icon name="calendar" size={15} />
          <span>{period}</span>
          <Icon name="chevron" size={13} />
        </button>
      </div>
      <section className="mt-panel">
        <div className="mt-usage-grid">
          <div>
            <span className="mt-stat-icon">
              <Icon name="box" size={18} />
            </span>
            <p>
              <small>Kompos</small>
              <strong>
                {idNumber(data.tersedia)} <em>kg</em>
              </strong>
            </p>
          </div>
          <div>
            <span className="mt-stat-icon">
              <Icon name="drop" size={18} />
            </span>
            <p>
              <small>NOC</small>
              <strong>
                {idNumber(data.nocTersedia)} <em>L</em>
              </strong>
            </p>
          </div>
        </div>
        <p className="mt-hint mt-calc-note">
          {data.lastTersedia ? `Update ${shortDate(data.lastTersedia)} ${data.lastTersedia.slice(0, 4)}` : 'Belum ada data'}
        </p>
      </section>
      <section className="mt-panel">
        <h2>Perhitungan stok</h2>
        <div className="mt-calc head">
          <span />
          <span>Kompos</span>
          <span>NOC</span>
        </div>
        {rows.map(([label, kompos, noc], index) => (
          <div className={`mt-calc${index === 2 ? ' total' : ''}`} key={label}>
            <span>{label}</span>
            <strong>
              {idNumber(kompos)} <em>kg</em>
            </strong>
            <strong>
              {idNumber(noc)} <em>L</em>
            </strong>
          </div>
        ))}
      </section>
    </>
  )
}

// ---- Rekap hadiah: member menukar poin, mitra konfirmasi penerimaan dengan bukti foto ----
type Redemption = {
  id: string
  code: string
  reward: string
  cost: number
  at: string
  received?: { at: string; photo: string; note: string }
}

const seedRedemptions: Redemption[] = [
  { id: 'TKR-000009', code: 'GP-00001', reward: 'Petro Gladiator 1kg', cost: 700, at: '2026-11-05T11:20:00' },
  {
    id: 'TKR-000002',
    code: 'GP-00001',
    reward: 'Kaos Petani',
    cost: 700,
    at: '2026-10-28T10:05:00',
    received: { at: '2026-10-29T13:40:00', photo: `${BASE}assets/reward-kaos.jpg`, note: 'Diterima langsung di titik kumpul.' },
  },
  { id: 'TKR-000008', code: 'GP-00007', reward: 'Phonska Cair 500ml', cost: 800, at: '2026-11-05T08:41:00' },
  { id: 'TKR-000007', code: 'GP-00003', reward: 'Kaos Petani', cost: 700, at: '2026-11-04T15:20:00' },
  { id: 'TKR-000006', code: 'GP-00012', reward: 'Petro Gladiator 1kg', cost: 700, at: '2026-11-04T09:12:00' },
  { id: 'TKR-000005', code: 'GP-00009', reward: 'Phonska OCA Plus', cost: 1100, at: '2026-11-03T13:05:00' },
  {
    id: 'TKR-000004',
    code: 'GP-00005',
    reward: 'Kaos Petani',
    cost: 700,
    at: '2026-11-02T10:30:00',
    received: { at: '2026-11-02T14:08:00', photo: `${BASE}assets/reward-kaos.jpg`, note: 'Diterima langsung di titik kumpul.' },
  },
  {
    id: 'TKR-000003',
    code: 'GP-00014',
    reward: 'Petro Gladiator 1kg',
    cost: 700,
    at: '2026-10-30T16:45:00',
    received: { at: '2026-10-31T09:22:00', photo: `${BASE}assets/reward-gladiator.jpg`, note: '' },
  },
]

const stamp = (iso: string) => {
  const d = new Date(iso)
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()} · ${pad2(d.getHours())}.${pad2(d.getMinutes())} WIB`
}

function MitraRewards({
  records,
  onConfirm,
  readOnly = false,
}: {
  records: Redemption[]
  onConfirm: (id: string, received: NonNullable<Redemption['received']>) => void
  readOnly?: boolean
}) {
  const [filter, setFilter] = useState<'semua' | 'menunggu' | 'diterima'>('semua')
  const [openId, setOpenId] = useState<string | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [notice, setNotice] = useState('')

  const rows = [...records]
    .sort((a, b) => b.at.localeCompare(a.at))
    .filter((item) => filter === 'semua' || (filter === 'diterima') === Boolean(item.received))
    .map((item) => ({ item, member: mitraMembers.find((m) => m.code === item.code) }))
  const open = records.find((item) => item.id === openId) ?? null
  const openMember = open ? mitraMembers.find((m) => m.code === open.code) : undefined
  const openReward = open ? rewards.find((r) => r.name === open.reward) : undefined
  const pending = records.filter((item) => !item.received).length

  function close() {
    setOpenId(null)
    setPhoto(null)
    setNote('')
  }

  function pick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
    event.target.value = ''
  }

  function confirm() {
    if (!open || !photo) return
    onConfirm(open.id, { at: new Date().toISOString(), photo, note: note.trim() })
    setNotice(`Penerimaan ${open.reward} oleh ${openMember?.name ?? open.code} dikonfirmasi.`)
    close()
  }

  return (
    <>
      <div className="mt-graph-head">
        <h1>Rekap hadiah</h1>
        <span className="mt-total">{pending} menunggu</span>
      </div>
      {notice && (
        <p className="mt-saved" role="status">
          <Icon name="check" size={16} strokeWidth={2.6} /> {notice}
        </p>
      )}
      <div className="mt-trend-filter">
        <div className="mt-toggle wide" role="tablist" aria-label="Status hadiah">
          {(['semua', 'menunggu', 'diterima'] as const).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? 'active' : ''}
              onClick={() => setFilter(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-panel mt-list">
        {rows.length === 0 && <p className="mt-hint">Belum ada penukaran hadiah.</p>}
        {rows.map(({ item, member }) => (
          <button key={item.id} className="mt-member" onClick={() => setOpenId(item.id)}>
            <span className="mt-avatar">{memberInitials(member?.name ?? item.code)}</span>
            <span className="mt-member-info">
              <strong>{member?.name ?? item.code}</strong>
              <small>
                {item.reward} · {fmt(item.cost)} poin
              </small>
              <small>Ditukar {stamp(item.at)}</small>
            </span>
            {item.received ? (
              <span className="mt-status done">
                <Icon name="check" size={13} strokeWidth={2.8} /> Diterima
              </span>
            ) : (
              <span className="mt-status wait">{readOnly ? 'Menunggu' : 'Konfirmasi'}</span>
            )}
          </button>
        ))}
      </section>

      {open && (
        <div className="modal-backdrop" onClick={close}>
          <section className="promo-sheet gp-sheet mt-picker mt-scroll" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={close} aria-label="Tutup" />
            <div className="mt-member-head">
              <span className="mt-avatar big">{memberInitials(openMember?.name ?? open.code)}</span>
              <div>
                <h2>{openMember?.name ?? open.code}</h2>
                <small>
                  {open.code} · {openMember?.village}
                </small>
              </div>
            </div>
            <div className="mt-reward-line">
              <span className="mt-reward-thumb">
                {openReward?.img ? <img src={openReward.img} alt={open.reward} /> : <Icon name="gift" size={24} />}
              </span>
              <div>
                <strong>{open.reward}</strong>
                <small>{fmt(open.cost)} poin</small>
              </div>
            </div>
            <div className="mt-sheet-sum">
              <div>
                <small>Waktu penukaran</small>
                <strong>{stamp(open.at)}</strong>
              </div>
              <div>
                <small>Kode transaksi</small>
                <strong>{open.id}</strong>
              </div>
            </div>

            {open.received ? (
              <>
                <h3 className="mt-sub">Bukti penerimaan</h3>
                <img className="mt-proof-img" src={open.received.photo} alt="Bukti penerimaan hadiah" />
                <div className="mt-sheet-sum">
                  <div>
                    <small>Dikonfirmasi</small>
                    <strong>{stamp(open.received.at)}</strong>
                  </div>
                  <div>
                    <small>Keterangan</small>
                    <strong>{open.received.note || '-'}</strong>
                  </div>
                </div>
              </>
            ) : readOnly ? (
              <p className="mt-hint">Menunggu konfirmasi penerimaan dari mitra dengan bukti foto.</p>
            ) : (
              <div className="mt-form">
                <div className="mt-field">
                  <span>Foto bukti penerimaan</span>
                  <label className={`mt-proof${photo ? ' filled' : ''}`}>
                    <input type="file" accept="image/*" hidden onChange={pick} />
                    {photo ? (
                      <img src={photo} alt="Pratinjau bukti penerimaan" />
                    ) : (
                      <>
                        <Icon name="camera" size={26} />
                        <b>Ambil atau pilih foto</b>
                        <small>Wajib diisi sebagai bukti hadiah sudah diterima</small>
                      </>
                    )}
                  </label>
                  {photo && (
                    <button className="mt-retake" onClick={() => setPhoto(null)}>
                      Ganti foto
                    </button>
                  )}
                </div>
                <label className="mt-field">
                  <span>
                    Keterangan <em>(opsional)</em>
                  </span>
                  <textarea rows={2} value={note} onChange={(event) => setNote(event.target.value)} />
                </label>
                <button className="mt-cta" disabled={!photo} onClick={confirm}>
                  Konfirmasi penerimaan hadiah
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  )
}

function MitraRanking({ period, onPick, showMe = true }: { period: string; onPick: () => void; showMe?: boolean }) {
  const [all, setAll] = useState(false)
  const rows = mitraRanking(period)
  const top = rows[0]?.kg ?? 1
  const shown = all ? rows : rows.slice(0, 10)

  return (
    <>
      <div className="mt-graph-head">
        <h1>Peringkat</h1>
        <button className="mt-period light" onClick={onPick} aria-label="Pilih periode">
          <Icon name="calendar" size={15} />
          <span>{period}</span>
          <Icon name="chevron" size={13} />
        </button>
      </div>
      <section className="mt-panel mt-list">
        {rows.length === 0 && <p className="mt-hint">Belum ada data BSO pada periode ini.</p>}
        {shown.map(({ name, area, kg, me }, index) => (
          <div key={name} className={`mt-rank${me && showMe ? " me" : ""}`}>
            <span className={`mt-rank-no n${index + 1 <= 3 ? index + 1 : 0}`}>{index + 1}</span>
            <span className="mt-member-info">
              <strong>{name}{me && showMe && <em className="mt-rank-you">Anda</em>}</strong>
              <small>{area}</small>
              <i className="mt-rank-bar">
                <b style={{ width: `${Math.max((kg / top) * 100, 4)}%` }} />
              </i>
            </span>
            <strong className="mt-rank-kg">{idNumber(kg)} kg</strong>
          </div>
        ))}
        {rows.length > 10 && (
          <button className="mt-more" onClick={() => setAll((value) => !value)}>
            {all ? 'Tampilkan lebih sedikit' : `Lihat semua (${rows.length})`}
          </button>
        )}
      </section>
    </>
  )
}

function MitraGladiator({ records, onSave }: { records: Usage[]; onSave: (item: Usage) => void }) {
  const [sheet, setSheet] = useState(false)
  const [type, setType] = useState<Usage['type']>('cair')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(TODAY)
  const [note, setNote] = useState('')
  const [notice, setNotice] = useState('')
  const [range, setRange] = useState<TrendRange>('bulanan')
  const [chart, setChart] = useState<'batang' | 'garis'>('batang')
  const [custom, setCustom] = useState({ from: '2026-10-01', to: TODAY })
  const [showAll, setShowAll] = useState(false)
  const unit = type === 'cair' ? 'L' : 'kg'
  const value = Number(amount.replace(',', '.'))
  const valid = value > 0 && Boolean(date)

  const history = records
    .map((item, index) => ({ item, index }))
    .sort((a, b) => b.item.date.localeCompare(a.item.date) || b.index - a.index)
    .map(({ item }) => item)
  const shown = showAll ? history : history.slice(0, 5)

  function save() {
    if (!valid) return
    onSave({ id: `u-${Date.now()}`, type, amount: value, date, note: note.trim() })
    setNotice(`Pemakaian Gladiator ${type === 'cair' ? 'Cair' : 'Padat'} ${idNumber(value)} ${unit} tercatat.`)
    setAmount('')
    setNote('')
    setSheet(false)
  }

  return (
    <>
      {notice && (
        <p className="mt-saved" role="status">
          <Icon name="check" size={16} strokeWidth={2.6} /> {notice}
        </p>
      )}
      <button className="mt-cta first" onClick={() => setSheet(true)}>
        <Icon name="plus" size={22} strokeWidth={2.4} /> Catat pemakaian gladiator
      </button>

      <div className="mt-trend-filter">
        <div className="mt-toggle wide" role="tablist" aria-label="Rentang grafik">
          {(['harian', 'mingguan', 'bulanan', 'custom'] as const).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={range === item}
              className={range === item ? 'active' : ''}
              onClick={() => setRange(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-toggle chart-type" role="tablist" aria-label="Jenis grafik">
          {(['batang', 'garis'] as const).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={chart === item}
              className={chart === item ? 'active' : ''}
              onClick={() => setChart(item)}
            >
              {item === 'batang' ? 'Batang' : 'Garis'}
            </button>
          ))}
        </div>
        {range === 'custom' && (
          <div className="mt-range">
            <input
              type="date"
              aria-label="Dari tanggal"
              value={custom.from}
              max={custom.to || TODAY}
              onChange={(event) => setCustom({ ...custom, from: event.target.value })}
            />
            <span>-</span>
            <input
              type="date"
              aria-label="Sampai tanggal"
              value={custom.to}
              min={custom.from}
              max={TODAY}
              onChange={(event) => setCustom({ ...custom, to: event.target.value })}
            />
          </div>
        )}
      </div>

      <ProductionChart title="Pemakaian Gladiator Cair" records={records} type="cair" range={range} custom={custom} unit="L" chart={chart} />
      <ProductionChart title="Pemakaian Gladiator Padat" records={records} type="padat" range={range} custom={custom} unit="kg" chart={chart} />

      <section className="mt-panel">
        <div className="mt-panel-head">
          <h2>Riwayat pemakaian</h2>
          <span className="mt-total">{history.length} data</span>
        </div>
        <ul className="mt-recent">
          {shown.map((item) => (
            <li key={item.id}>
              <span className="mt-stat-icon">
                <Icon name={item.type === 'cair' ? 'drop' : 'box'} size={20} />
              </span>
              <div>
                <strong>
                  Gladiator {item.type === 'cair' ? 'Cair' : 'Padat'} · {idNumber(item.amount)} {item.type === 'cair' ? 'L' : 'kg'}
                </strong>
                <small>
                  {shortDate(item.date)} {item.date.slice(0, 4)}
                </small>
                {item.note && <small>{item.note}</small>}
              </div>
            </li>
          ))}
        </ul>
        {history.length > 5 && (
          <button className="mt-more" onClick={() => setShowAll((value) => !value)}>
            {showAll ? 'Tampilkan lebih sedikit' : `Lihat semua (${history.length})`}
          </button>
        )}
      </section>

      {sheet && (
        <div className="modal-backdrop" onClick={() => setSheet(false)}>
          <section className="promo-sheet gp-sheet mt-picker" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setSheet(false)} aria-label="Tutup" />
            <h2>Catat pemakaian gladiator</h2>
            <div className="mt-form">
              <div className="mt-field">
                <span>Jenis Gladiator</span>
                <div className="mt-toggle wide" role="tablist" aria-label="Jenis Gladiator">
                  {(['cair', 'padat'] as const).map((item) => (
                    <button
                      key={item}
                      role="tab"
                      aria-selected={type === item}
                      className={type === item ? 'active' : ''}
                      onClick={() => setType(item)}
                    >
                      {item === 'cair' ? 'Gladiator Cair' : 'Gladiator Padat'}
                    </button>
                  ))}
                </div>
              </div>
              <label className="mt-field">
                <span>Jumlah ({unit})</span>
                <div className="mt-input-unit">
                  <input
                    inputMode="decimal"
                    placeholder="0"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value.replace(/[^0-9.,]/g, ''))}
                  />
                  <i>{unit}</i>
                </div>
              </label>
              <label className="mt-field">
                <span>Tanggal pemakaian</span>
                <input type="date" value={date} max={TODAY} onChange={(event) => setDate(event.target.value)} />
              </label>
              <label className="mt-field">
                <span>
                  Catatan <em>(opsional)</em>
                </span>
                <textarea rows={2} value={note} onChange={(event) => setNote(event.target.value)} />
              </label>
              <button className="mt-cta" disabled={!valid} onClick={save}>
                Simpan pemakaian
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

function MitraProduction({ records, onSave }: { records: Production[]; onSave: (item: Production) => void }) {
  const [type, setType] = useState<Production['type']>('kompos')
  const [location, setLocation] = useState(mitraSites[0])
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(TODAY)
  const [note, setNote] = useState('')
  const [notice, setNotice] = useState('')
  const [range, setRange] = useState<TrendRange>('bulanan')
  const [chart, setChart] = useState<'batang' | 'garis'>('batang')
  const [custom, setCustom] = useState({ from: '2026-10-01', to: TODAY })
  const unit = type === 'kompos' ? 'kg' : 'L'
  const value = Number(amount.replace(',', '.'))
  const valid = value > 0 && Boolean(date)

  const recent = records
    .map((item, index) => ({ item, index }))
    .sort((a, b) => b.item.date.localeCompare(a.item.date) || b.index - a.index)
    .slice(0, 3)
    .map(({ item }) => item)

  function save() {
    if (!valid) return
    onSave({ id: `u-${Date.now()}`, type, amount: value, date, location, note: note.trim() })
    setNotice(`Produksi ${type === 'kompos' ? 'kompos' : 'NOC'} ${idNumber(value)} ${unit} tercatat.`)
    setAmount('')
    setNote('')
  }

  return (
    <>
      <section className="mt-panel">
        <h2>Catat hasil produksi</h2>
        {notice && (
          <p className="mt-saved" role="status">
            <Icon name="check" size={16} strokeWidth={2.6} /> {notice}
          </p>
        )}
        <div className="mt-form">
          <div className="mt-field">
            <span>Jenis produksi</span>
            <div className="mt-toggle wide" role="tablist" aria-label="Jenis produksi">
              {(['kompos', 'noc'] as const).map((item) => (
                <button
                  key={item}
                  role="tab"
                  aria-selected={type === item}
                  className={type === item ? 'active' : ''}
                  onClick={() => setType(item)}
                >
                  {item === 'kompos' ? 'Kompos' : 'NOC'}
                </button>
              ))}
            </div>
          </div>
          <label className="mt-field">
            <span>Lokasi</span>
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              {mitraSites.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="mt-field">
            <span>{type === 'kompos' ? 'Produksi kompos (kg)' : 'Produksi NOC (L)'}</span>
            <div className="mt-input-unit">
              <input
                inputMode="decimal"
                placeholder="0"
                value={amount}
                onChange={(event) => setAmount(event.target.value.replace(/[^0-9.,]/g, ''))}
              />
              <i>{unit}</i>
            </div>
          </label>
          <label className="mt-field">
            <span>Tanggal</span>
            <input type="date" value={date} max={TODAY} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="mt-field">
            <span>
              Catatan <em>(opsional)</em>
            </span>
            <textarea rows={2} value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
          <button className="mt-cta" disabled={!valid} onClick={save}>
            Simpan produksi
          </button>
        </div>
      </section>

      <div className="mt-trend-filter">
        <div className="mt-toggle wide" role="tablist" aria-label="Rentang tren">
          {(['mingguan', 'bulanan', 'tahunan', 'custom'] as const).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={range === item}
              className={range === item ? 'active' : ''}
              onClick={() => setRange(item)}
            >
              {item === 'custom' ? 'Custom' : item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-toggle chart-type" role="tablist" aria-label="Jenis grafik">
          {(['batang', 'garis'] as const).map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={chart === item}
              className={chart === item ? 'active' : ''}
              onClick={() => setChart(item)}
            >
              {item === 'batang' ? 'Batang' : 'Garis'}
            </button>
          ))}
        </div>
        {range === 'custom' && (
          <div className="mt-range">
            <input
              type="date"
              aria-label="Dari tanggal"
              value={custom.from}
              max={custom.to || TODAY}
              onChange={(event) => setCustom({ ...custom, from: event.target.value })}
            />
            <span>-</span>
            <input
              type="date"
              aria-label="Sampai tanggal"
              value={custom.to}
              min={custom.from}
              max={TODAY}
              onChange={(event) => setCustom({ ...custom, to: event.target.value })}
            />
          </div>
        )}
      </div>

      <ProductionChart records={records} type="kompos" range={range} custom={custom} unit="kg" chart={chart} />
      <ProductionChart records={records} type="noc" range={range} custom={custom} unit="L" chart={chart} />

      <section className="mt-panel">
        <h2>Riwayat terbaru</h2>
        <ul className="mt-recent">
          {recent.map((item) => (
            <li key={item.id}>
              <span className="mt-stat-icon">
                <Icon name={item.type === 'kompos' ? 'sprout' : 'drop'} size={20} />
              </span>
              <div>
                <strong>
                  {item.type === 'kompos' ? 'Kompos' : 'NOC'} · {idNumber(item.amount)} {item.type === 'kompos' ? 'kg' : 'L'}
                </strong>
                <small>
                  {shortDate(item.date)} {item.date.slice(0, 4)} · {item.location}
                </small>
                {item.note && <small>{item.note}</small>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

const idNumber = (value: number, digits = 1) =>
  value.toLocaleString('id-ID', { maximumFractionDigits: digits })

// ---- Sheet pilih periode (dipakai Mitra dan Super Admin) ----
function MitraPeriodSheet({
  period,
  setPeriod,
  pickYear,
  setPickYear,
  onClose,
}: {
  period: string
  setPeriod: (period: string) => void
  pickYear: number
  setPickYear: (year: number) => void
  onClose: () => void
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="promo-sheet gp-sheet mt-picker" onClick={(event) => event.stopPropagation()}>
        <button className="sheet-handle" onClick={onClose} aria-label="Tutup" />
        <h2>Pilih periode</h2>
        <button
          className={`mt-all ${period === 'Semua bulan' ? 'active' : ''}`}
          onClick={() => {
            setPeriod('Semua bulan')
            onClose()
          }}
        >
          <Icon name="layers" size={20} />
          <span>
            <b>Semua bulan</b>
            <small>Total seluruh periode</small>
          </span>
          {period === 'Semua bulan' && <Icon name="check" size={18} strokeWidth={3} />}
        </button>
        <div className="mt-years" role="tablist" aria-label="Tahun">
          {mitraYears.map((year) => (
            <button
              key={year}
              role="tab"
              aria-selected={pickYear === year}
              className={pickYear === year ? 'active' : ''}
              onClick={() => setPickYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="mt-months">
          {monthNames.map((name) => {
            const key = `${name} ${pickYear}`
            const empty = mitraPeriods[key].bso === 0
            return (
              <button
                key={key}
                className={`${period === key ? 'active' : ''} ${empty ? 'empty' : ''}`}
                onClick={() => {
                  setPeriod(key)
                  onClose()
                }}
              >
                {name}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

// ---- Kompos Station: sebaran program (peta, daftar, tambah) ----
type Station = {
  id: string
  name: string
  mitra: string
  address: string
  phone: string
  hours: string
  capacity: number
  wastes: string[]
  lat: number
  lng: number
  tx: { bso: number; produksi: number; pengambilan: number }
}

type StationDraft = Pick<Station, 'name' | 'mitra' | 'address' | 'phone' | 'hours' | 'capacity' | 'wastes' | 'lat' | 'lng'>

const stationWastes = ['Sampah basah', 'Sampah kebun', 'Sampah kering', 'Sampah pasar']

// Data contoh. Transaksi Bojonegoro memakai data nyata dari role Mitra.
const seedStations: Station[] = [
  {
    id: 'PKG-0001',
    name: mitraSites[0],
    mitra: 'Mitra Bojonegoro Kanwil I',
    address: 'Jl. Raya Bojonegoro–Cepu KM 3, Kec. Bojonegoro, Kab. Bojonegoro, Jawa Timur 62119',
    phone: '0353 881 234',
    hours: 'Senin–Sabtu, 08.00–16.00 WIB',
    capacity: 2000,
    wastes: ['Sampah basah', 'Sampah kebun', 'Sampah kering'],
    lat: -7.1502,
    lng: 111.8817,
    tx: { bso: mitraDeposits.length, produksi: seedProductions.length, pengambilan: seedPickups.length },
  },
  {
    id: 'PKG-0002',
    name: mitraSites[1],
    mitra: 'Mitra Lamongan Kanwil II',
    address: 'Jl. Basuki Rahmat No. 21, Kec. Lamongan, Kab. Lamongan, Jawa Timur 62211',
    phone: '0322 321 456',
    hours: 'Senin–Jumat, 08.00–15.00 WIB',
    capacity: 2000,
    wastes: ['Sampah basah', 'Sampah kebun'],
    lat: -7.1166,
    lng: 112.4167,
    tx: { bso: 64, produksi: 24, pengambilan: 20 },
  },
  {
    id: 'PKG-0003',
    name: mitraSites[2],
    mitra: 'Mitra Tuban Kanwil I',
    address: 'Jl. Dr. Wahidin Sudirohusodo No. 8, Kec. Tuban, Kab. Tuban, Jawa Timur 62315',
    phone: '0356 322 789',
    hours: 'Senin–Sabtu, 07.30–15.30 WIB',
    capacity: 2500,
    wastes: ['Sampah basah', 'Sampah kebun', 'Sampah pasar'],
    lat: -6.8976,
    lng: 112.0647,
    tx: { bso: 51, produksi: 22, pengambilan: 18 },
  },
]

const mapsLink = (station: Station) => `https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lng}`

function StationMap({
  stations,
  selectedId,
  onSelect,
}: {
  stations: Station[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}) {
  const box = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const layer = useRef<L.LayerGroup | null>(null)
  const pick = useRef(onSelect)
  pick.current = onSelect

  useEffect(() => {
    if (!box.current) return
    const instance = L.map(box.current).setView([-7.3, 112], 8)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(instance)
    layer.current = L.layerGroup().addTo(instance)
    map.current = instance
    const timer = setTimeout(() => instance.invalidateSize(), 200)
    return () => {
      clearTimeout(timer)
      instance.remove()
      map.current = null
    }
  }, [])

  useEffect(() => {
    const group = layer.current
    if (!group) return
    group.clearLayers()
    stations.forEach((station) => {
      const icon = L.divIcon({
        className: 'sa-pin-wrap',
        html: `<span class="sa-pin${station.id === selectedId ? ' on' : ''}"></span>`,
        iconSize: [30, 38],
        iconAnchor: [15, 36],
      })
      const label = document.createElement('span')
      label.textContent = station.name
      L.marker([station.lat, station.lng], { icon, title: station.name })
        .addTo(group)
        .bindTooltip(label, { direction: 'top', offset: [0, -30] })
        .on('click', () => pick.current(station.id === selectedId ? null : station.id))
    })
  }, [stations, selectedId])

  useEffect(() => {
    const instance = map.current
    if (!instance) return
    const chosen = stations.find((station) => station.id === selectedId)
    if (chosen) instance.flyTo([chosen.lat, chosen.lng], 14, { duration: 0.6 })
    else if (stations.length)
      instance.fitBounds(L.latLngBounds(stations.map((station) => [station.lat, station.lng] as [number, number])), {
        padding: [40, 40],
        maxZoom: 11,
      })
  }, [selectedId, stations])

  return <div ref={box} className="sa-map" role="region" aria-label="Peta sebaran kompos station" />
}

function StationForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: Station
  submitLabel: string
  onSubmit: (draft: StationDraft) => void
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    mitra: initial?.mitra ?? '',
    address: initial?.address ?? '',
    phone: initial?.phone ?? '',
    hours: initial?.hours ?? '',
    capacity: String(initial?.capacity ?? 2000),
    lat: initial ? String(initial.lat) : '',
    lng: initial ? String(initial.lng) : '',
    wastes: initial?.wastes ?? [],
  })
  const set = (key: 'name' | 'mitra' | 'address' | 'phone' | 'hours') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }))
  const capacity = Number(form.capacity.replace(',', '.'))
  const lat = Number(form.lat.replace(',', '.'))
  const lng = Number(form.lng.replace(',', '.'))
  const valid =
    [form.name, form.mitra, form.address, form.phone, form.hours].every((value) => value.trim()) &&
    capacity > 0 &&
    form.lat.trim() !== '' &&
    form.lng.trim() !== '' &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180 &&
    form.wastes.length > 0

  return (
    <div className="mt-form">
      <label className="mt-field">
        <span>Nama kompos station</span>
        <input value={form.name} onChange={set('name')} placeholder="PKG Cabang ..." />
      </label>
      <label className="mt-field">
        <span>Nama mitra</span>
        <input value={form.mitra} onChange={set('mitra')} placeholder="Mitra ..." />
      </label>
      <label className="mt-field">
        <span>Alamat lokasi</span>
        <textarea rows={2} value={form.address} onChange={set('address')} />
      </label>
      <div className="mt-field">
        <span>Titik koordinat</span>
        <div className="sa-coords">
          <input
            inputMode="decimal"
            placeholder="Latitude, mis. -7.1502"
            aria-label="Latitude"
            value={form.lat}
            onChange={(event) => setForm((c) => ({ ...c, lat: event.target.value.replace(/[^0-9.,-]/g, '') }))}
          />
          <input
            inputMode="decimal"
            placeholder="Longitude, mis. 111.8817"
            aria-label="Longitude"
            value={form.lng}
            onChange={(event) => setForm((c) => ({ ...c, lng: event.target.value.replace(/[^0-9.,-]/g, '') }))}
          />
        </div>
        <small>Salin dari Google Maps: tekan lama pada titik lokasi, lalu salin angka koordinatnya.</small>
      </div>
      <label className="mt-field">
        <span>No. telepon</span>
        <input inputMode="tel" value={form.phone} onChange={set('phone')} placeholder="0353 881 234" />
      </label>
      <label className="mt-field">
        <span>Jadwal buka</span>
        <input value={form.hours} onChange={set('hours')} placeholder="Senin–Sabtu, 08.00–16.00 WIB" />
      </label>
      <label className="mt-field">
        <span>Kapasitas (kg/siklus)</span>
        <div className="mt-input-unit">
          <input
            inputMode="decimal"
            value={form.capacity}
            onChange={(event) => setForm((c) => ({ ...c, capacity: event.target.value.replace(/[^0-9.,]/g, '') }))}
          />
          <i>kg</i>
        </div>
      </label>
      <div className="mt-field">
        <span>Jenis sampah yang diterima</span>
        <div className="sa-chips">
          {stationWastes.map((item) => {
            const on = form.wastes.includes(item)
            return (
              <button
                key={item}
                type="button"
                className={on ? 'on' : ''}
                aria-pressed={on}
                onClick={() =>
                  setForm((c) => ({
                    ...c,
                    wastes: on ? c.wastes.filter((w) => w !== item) : [...c.wastes, item],
                  }))
                }
              >
                {on && <Icon name="check" size={14} strokeWidth={3} />} {item}
              </button>
            )
          })}
        </div>
      </div>
      <button
        className="mt-cta"
        disabled={!valid}
        onClick={() =>
          onSubmit({
            name: form.name.trim(),
            mitra: form.mitra.trim(),
            address: form.address.trim(),
            phone: form.phone.trim(),
            hours: form.hours.trim(),
            capacity,
            wastes: stationWastes.filter((item) => form.wastes.includes(item)),
            lat,
            lng,
          })
        }
      >
        {submitLabel}
      </button>
    </div>
  )
}

function AdminStations({
  stations,
  setStations,
}: {
  stations: Station[]
  setStations: React.Dispatch<React.SetStateAction<Station[]>>
}) {
  const [view, setView] = useState<'peta' | 'list' | 'tambah'>('peta')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Station | null>(null)
  const [deleting, setDeleting] = useState<Station | null>(null)
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const shown = stations.filter(
    (item) =>
      !needle || [item.name, item.mitra, item.id, item.address].some((field) => field.toLowerCase().includes(needle)),
  )
  const search = (
    <label className="mt-search">
      <Icon name="search" size={20} />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Cari nama kompos station"
        aria-label="Cari kompos station"
      />
      {query && (
        <button onClick={() => setQuery('')} aria-label="Hapus pencarian">
          Hapus
        </button>
      )}
    </label>
  )
  const emptyText = needle ? 'Kompos station tidak ditemukan.' : 'Belum ada kompos station.'

  function add(draft: StationDraft) {
    const next = Math.max(0, ...stations.map((item) => Number(item.id.slice(4)))) + 1
    const id = `PKG-${String(next).padStart(4, '0')}`
    setStations((list) => [...list, { ...draft, id, tx: { bso: 0, produksi: 0, pengambilan: 0 } }])
    setNotice(`${draft.name} ditambahkan.`)
    setView('list')
  }

  function save(draft: StationDraft) {
    if (!editing) return
    setStations((list) => list.map((item) => (item.id === editing.id ? { ...item, ...draft } : item)))
    setNotice(`Data ${draft.name} diperbarui.`)
    setEditing(null)
  }

  function remove() {
    if (!deleting) return
    setStations((list) => list.filter((item) => item.id !== deleting.id))
    if (selectedId === deleting.id) setSelectedId(null)
    setNotice(`${deleting.name} dihapus.`)
    setDeleting(null)
  }

  const txTotal = deleting ? deleting.tx.bso + deleting.tx.produksi + deleting.tx.pengambilan : 0

  return (
    <>
      <div className="mt-graph-head">
        <div className="sa-head">
          <h1>Kompos Station</h1>
          <small>Sebaran program · {stations.length} lokasi</small>
        </div>
      </div>
      {notice && (
        <p className="mt-saved" role="status">
          <Icon name="check" size={16} strokeWidth={2.6} /> {notice}
        </p>
      )}
      <div className="mt-trend-filter">
        <div className="mt-toggle wide" role="tablist" aria-label="Tampilan kompos station">
          {(
            [
              ['peta', 'Peta'],
              ['list', 'List'],
              ['tambah', 'Tambah Data'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={view === key}
              className={view === key ? 'active' : ''}
              onClick={() => {
                setView(key)
                setNotice('')
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === 'peta' && (
        <>
          {search}
          <section className="mt-panel sa-map-panel">
            <StationMap stations={shown} selectedId={selectedId} onSelect={setSelectedId} />
          </section>
          <section className="sa-st-list" aria-label="Daftar lokasi">
            {shown.length === 0 && <p className="mt-hint">{emptyText}</p>}
            {shown.map((station) => (
              <div key={station.id} className={`sa-st-card${selectedId === station.id ? ' on' : ''}`}>
                <button
                  className="sa-st-main"
                  onClick={() => setSelectedId(selectedId === station.id ? null : station.id)}
                  aria-pressed={selectedId === station.id}
                >
                  <span className="mt-stat-icon">
                    <Icon name="pin" size={18} />
                  </span>
                  <span className="mt-member-info">
                    <strong>{station.name}</strong>
                    <small>{station.address}</small>
                  </span>
                </button>
                <a className="sa-gmaps" href={mapsLink(station)} target="_blank" rel="noopener noreferrer">
                  <Icon name="external" size={15} /> Buka di Google Maps
                </a>
              </div>
            ))}
          </section>
        </>
      )}

      {view === 'list' && (
        <>
        {search}
        <section className="sa-st-list" aria-label="List kompos station">
          {shown.length === 0 && (
            <p className="mt-hint">{needle ? emptyText : 'Belum ada kompos station. Tambahkan lewat tab Tambah Data.'}</p>
          )}
          {shown.map((station) => (
            <article key={station.id} className="mt-panel sa-detail">
              <header>
                <div>
                  <strong>{station.name}</strong>
                  <small>{station.id}</small>
                </div>
              </header>
              <dl>
                <div>
                  <dt>Nama mitra</dt>
                  <dd>{station.mitra}</dd>
                </div>
                <div>
                  <dt>Alamat lokasi</dt>
                  <dd>{station.address}</dd>
                </div>
                <div>
                  <dt>No. telepon</dt>
                  <dd>
                    <a href={`tel:${station.phone.replace(/\s/g, '')}`}>{station.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>Jadwal buka</dt>
                  <dd>{station.hours}</dd>
                </div>
                <div>
                  <dt>Kapasitas</dt>
                  <dd>{idNumber(station.capacity, 0)} kg/siklus</dd>
                </div>
                <div>
                  <dt>Jenis sampah diterima</dt>
                  <dd>
                    <span className="sa-tags">
                      {station.wastes.map((item) => (
                        <i key={item}>{item}</i>
                      ))}
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="sa-actions">
                <button onClick={() => setEditing(station)}>
                  <Icon name="edit" size={16} /> Edit
                </button>
                <button className="danger" onClick={() => setDeleting(station)}>
                  <Icon name="trash" size={16} /> Hapus
                </button>
              </div>
            </article>
          ))}
        </section>
        </>
      )}

      {view === 'tambah' && (
        <section className="mt-panel">
          <h2>Tambah kompos station</h2>
          <StationForm submitLabel="Tambah kompos station" onSubmit={add} />
        </section>
      )}

      {editing && (
        <div className="modal-backdrop" onClick={() => setEditing(null)}>
          <section className="promo-sheet gp-sheet mt-picker mt-scroll" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setEditing(null)} aria-label="Tutup" />
            <h2>Edit kompos station</h2>
            <StationForm key={editing.id} initial={editing} submitLabel="Simpan perubahan" onSubmit={save} />
          </section>
        </div>
      )}

      {deleting && (
        <div className="modal-backdrop" onClick={() => setDeleting(null)}>
          <section className="promo-sheet gp-sheet" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setDeleting(null)} aria-label="Tutup" />
            <h2>Hapus {deleting.name}?</h2>
            {txTotal > 0 ? (
              <>
                <p>
                  Kompos station ini memiliki <b>{txTotal} data transaksi</b>. Seluruh data tersebut akan ikut
                  terhapus dan tidak dapat dikembalikan.
                </p>
                <ul className="sa-tx">
                  <li>
                    <span>Setoran BSO</span>
                    <b>{deleting.tx.bso}</b>
                  </li>
                  <li>
                    <span>Produksi</span>
                    <b>{deleting.tx.produksi}</b>
                  </li>
                  <li>
                    <span>Pengambilan</span>
                    <b>{deleting.tx.pengambilan}</b>
                  </li>
                </ul>
              </>
            ) : (
              <p>Kompos station ini belum memiliki data transaksi. Data yang dihapus tidak dapat dikembalikan.</p>
            )}
            <p>Apakah Anda yakin ingin menghapus?</p>
            <div className="gp-confirm sheet-confirm">
              <div>
                <button onClick={() => setDeleting(null)}>Batal</button>
                <button className="strong danger" onClick={remove}>
                  Ya, hapus
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

// ---- Pengguna: member, mitra, petugas lapangan, admin ----
const userRoles = ['Member Gladi', 'Mitra Kompos', 'Petugas Lapangan', 'Admin'] as const
type UserRole = (typeof userRoles)[number]

type AppUser = {
  id: string
  name: string
  role: UserRole
  phone: string
  email: string
  stationId: string
}

const userPrefix: Record<UserRole, string> = {
  'Member Gladi': 'GP-',
  'Mitra Kompos': 'MK-',
  'Petugas Lapangan': 'PL-',
  Admin: 'AD-',
}
const userId = (role: UserRole, n: number) => `${userPrefix[role]}${String(n).padStart(role === 'Member Gladi' ? 5 : 3, '0')}`

// Data contoh. Jumlah member per station: Bojonegoro 18 (sama dengan role Mitra), Lamongan 27, Tuban 21.
const seedUsers: AppUser[] = (() => {
  const first = ['Ahmad', 'Siti', 'Budi', 'Dewi', 'Agus', 'Rina', 'Hendra', 'Wulan', 'Yusuf', 'Lestari', 'Bambang', 'Fitri', 'Rudi', 'Maya', 'Dedi', 'Sari', 'Imam', 'Nia', 'Teguh', 'Ratna', 'Fajar', 'Anisa', 'Joko', 'Mega', 'Slamet', 'Putri', 'Hadi', 'Indah', 'Wawan']
  const last = ['Santoso', 'Wijaya', 'Rahayu', 'Hidayat', 'Kurniawan', 'Setiawan', 'Lestari', 'Nugroho', 'Saputra', 'Pratama', 'Yulianto', 'Mulyani', 'Hartono', 'Susanti', 'Purnomo']
  const phone = (i: number) => `0812-${String(1000 + ((i * 37) % 9000))}-${String(1000 + ((i * 91) % 9000))}`
  const emailOf = (name: string) => `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@gmail.com`
  const list: AppUser[] = []
  mitraMembers.forEach((member, index) =>
    list.push({ id: member.code, name: member.name, role: 'Member Gladi', phone: phone(index), email: emailOf(member.name), stationId: 'PKG-0001' }),
  )
  let n = mitraMembers.length
  ;[
    ['PKG-0002', 27],
    ['PKG-0003', 21],
  ].forEach(([stationId, count]) => {
    for (let i = 0; i < (count as number); i++) {
      n += 1
      const name = `${first[(n * 5) % first.length]} ${last[(n * 7 + 3) % last.length]}`
      list.push({ id: userId('Member Gladi', n), name, role: 'Member Gladi', phone: phone(n), email: emailOf(name), stationId: stationId as string })
    }
  })
  list.push(
    { id: 'MK-001', name: 'Mitra Bojonegoro Kanwil I', role: 'Mitra Kompos', phone: '0353 881 234', email: 'mitra.bojonegoro@agrifertile.com', stationId: 'PKG-0001' },
    { id: 'MK-002', name: 'Mitra Lamongan Kanwil II', role: 'Mitra Kompos', phone: '0322 321 456', email: 'mitra.lamongan@agrifertile.com', stationId: 'PKG-0002' },
    { id: 'MK-003', name: 'Mitra Tuban Kanwil I', role: 'Mitra Kompos', phone: '0356 322 789', email: 'mitra.tuban@agrifertile.com', stationId: 'PKG-0003' },
    { id: 'PL-001', name: 'Hendro Prasetyo', role: 'Petugas Lapangan', phone: '0813-2201-4455', email: 'hendro.prasetyo@agrifertile.com', stationId: 'PKG-0001' },
    { id: 'PL-002', name: 'Yani Maharani', role: 'Petugas Lapangan', phone: '0813-5530-2189', email: 'yani.maharani@agrifertile.com', stationId: 'PKG-0002' },
    { id: 'PL-003', name: 'Rizal Fauzan', role: 'Petugas Lapangan', phone: '0813-7741-9023', email: 'rizal.fauzan@agrifertile.com', stationId: 'PKG-0003' },
    { id: 'PL-004', name: 'Dian Kusuma', role: 'Petugas Lapangan', phone: '0813-6612-3370', email: 'dian.kusuma@agrifertile.com', stationId: 'PKG-0001' },
    { id: 'AD-001', name: 'Nadia Putri', role: 'Admin', phone: '0811-2345-6789', email: 'nadia.putri@agrifertile.com', stationId: '' },
    { id: 'AD-002', name: 'Rangga Mahendra', role: 'Admin', phone: '0811-9876-5432', email: 'rangga.mahendra@agrifertile.com', stationId: '' },
  )
  return list
})()

type UserDraft = Omit<AppUser, 'id'>

const exportHeader = ['Kode', 'Nama', 'Role', 'No. telepon', 'Email', 'Kompos station']

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

async function usersToXlsx(rows: string[][]) {
  const { default: writeXlsxFile } = await import('write-excel-file/browser')
  const head = exportHeader.map((value) => ({ value, fontWeight: 'bold' as const, backgroundColor: '#E7F0D0' }))
  return writeXlsxFile(
    [head, ...rows],
    { sheet: 'Pengguna', columns: [{ width: 12 }, { width: 28 }, { width: 18 }, { width: 18 }, { width: 34 }, { width: 26 }] },
  ).toBlob()
}

async function usersToPdf(rows: string[][], subtitle: string) {
  const [{ jsPDF }, { autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')])
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  doc.setFontSize(15)
  doc.text('Daftar Pengguna GladiPoint', 40, 42)
  doc.setFontSize(9)
  doc.setTextColor(110)
  doc.text(subtitle, 40, 58)
  autoTable(doc, {
    startY: 72,
    head: [exportHeader],
    body: rows,
    margin: { left: 40, right: 40 },
    styles: { fontSize: 8, cellPadding: 4 },
    headStyles: { fillColor: [31, 77, 44] },
    alternateRowStyles: { fillColor: [247, 250, 238] },
  })
  return doc.output('blob')
}

function UserForm({
  initial,
  stations,
  submitLabel,
  onSubmit,
}: {
  initial?: AppUser
  stations: Station[]
  submitLabel: string
  onSubmit: (draft: UserDraft) => void
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    role: initial?.role ?? ('Member Gladi' as UserRole),
    phone: initial?.phone ?? '',
    email: initial?.email ?? '',
    stationId: initial?.stationId ?? stations[0]?.id ?? '',
  })
  const needStation = form.role !== 'Admin'
  const valid =
    form.name.trim() !== '' &&
    form.phone.trim() !== '' &&
    /^\S+@\S+\.\S+$/.test(form.email.trim()) &&
    (!needStation || stations.some((item) => item.id === form.stationId))

  return (
    <div className="mt-form">
      <label className="mt-field">
        <span>Nama lengkap</span>
        <input value={form.name} onChange={(event) => setForm((c) => ({ ...c, name: event.target.value }))} />
      </label>
      <div className="mt-field">
        <span>Role</span>
        <div className="sa-chips">
          {userRoles.map((item) => (
            <button
              key={item}
              type="button"
              className={form.role === item ? 'on' : ''}
              aria-pressed={form.role === item}
              onClick={() => setForm((c) => ({ ...c, role: item }))}
            >
              {form.role === item && <Icon name="check" size={14} strokeWidth={3} />} {item}
            </button>
          ))}
        </div>
      </div>
      <label className="mt-field">
        <span>No. telepon</span>
        <input inputMode="tel" value={form.phone} onChange={(event) => setForm((c) => ({ ...c, phone: event.target.value }))} />
      </label>
      <label className="mt-field">
        <span>Email</span>
        <input type="email" value={form.email} onChange={(event) => setForm((c) => ({ ...c, email: event.target.value }))} />
      </label>
      {needStation ? (
        <label className="mt-field">
          <span>Kompos station</span>
          <select value={form.stationId} onChange={(event) => setForm((c) => ({ ...c, stationId: event.target.value }))}>
            {stations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="mt-hint">Admin memiliki akses ke seluruh cakupan.</p>
      )}
      <button
        className="mt-cta"
        disabled={!valid}
        onClick={() =>
          onSubmit({
            name: form.name.trim(),
            role: form.role,
            phone: form.phone.trim(),
            email: form.email.trim(),
            stationId: needStation ? form.stationId : '',
          })
        }
      >
        {submitLabel}
      </button>
    </div>
  )
}

function AdminUsers({
  users,
  setUsers,
  stations,
}: {
  users: AppUser[]
  setUsers: React.Dispatch<React.SetStateAction<AppUser[]>>
  stations: Station[]
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'Semua' | UserRole>('Semua')
  const [adding, setAdding] = useState(false)
  const [open, setOpen] = useState<AppUser | null>(null)
  const [editing, setEditing] = useState<AppUser | null>(null)
  const [deleting, setDeleting] = useState<AppUser | null>(null)
  const [notice, setNotice] = useState('')
  const [exportSheet, setExportSheet] = useState(false)
  const [busy, setBusy] = useState('')
  const needle = query.trim().toLowerCase()
  const stationName = (id: string) => (id ? (stations.find((item) => item.id === id)?.name ?? 'Station dihapus') : 'Seluruh cakupan')
  const shown = users.filter(
    (item) =>
      (filter === 'Semua' || item.role === filter) &&
      (!needle || [item.name, item.id, item.phone, item.email].some((field) => field.toLowerCase().includes(needle))),
  )

  async function exportAs(kind: 'xlsx' | 'pdf') {
    setBusy(kind)
    try {
      const rows = shown.map((user) => [user.id, user.name, user.role, user.phone, user.email, stationName(user.stationId)])
      const today = new Date()
      const stamp = today.toISOString().slice(0, 10)
      const subtitle = [
        `Role: ${filter}`,
        needle ? `Pencarian: "${query.trim()}"` : '',
        `${rows.length} pengguna`,
        `Dibuat ${today.getDate()} ${adminMonths[today.getMonth()]} ${today.getFullYear()}`,
      ]
        .filter(Boolean)
        .join('  ·  ')
      const blob = kind === 'xlsx' ? await usersToXlsx(rows) : await usersToPdf(rows, subtitle)
      saveBlob(blob, `pengguna-gladipoint-${stamp}.${kind}`)
      setNotice(`${rows.length} pengguna diekspor ke ${kind === 'xlsx' ? 'Excel' : 'PDF'}.`)
      setExportSheet(false)
    } catch {
      setNotice('Ekspor gagal. Coba lagi.')
    } finally {
      setBusy('')
    }
  }

  function add(draft: UserDraft) {
    const prefix = userPrefix[draft.role]
    const next = Math.max(0, ...users.filter((item) => item.id.startsWith(prefix)).map((item) => Number(item.id.slice(prefix.length)))) + 1
    setUsers((list) => [{ ...draft, id: userId(draft.role, next) }, ...list])
    setNotice(`${draft.name} ditambahkan sebagai ${draft.role}.`)
    setAdding(false)
  }

  function save(draft: UserDraft) {
    if (!editing) return
    setUsers((list) => list.map((item) => (item.id === editing.id ? { ...item, ...draft } : item)))
    setNotice(`Data ${draft.name} diperbarui.`)
    setEditing(null)
    setOpen(null)
  }

  function remove() {
    if (!deleting) return
    setUsers((list) => list.filter((item) => item.id !== deleting.id))
    setNotice(`${deleting.name} dihapus.`)
    setDeleting(null)
    setOpen(null)
  }

  const txCount = deleting ? mitraDeposits.filter((item) => item.code === deleting.id).length : 0
  const roleIcon: Record<UserRole, string> = {
    'Member Gladi': 'users',
    'Mitra Kompos': 'store',
    'Petugas Lapangan': 'clipboard',
    Admin: 'shield',
  }

  return (
    <>
      <div className="mt-graph-head">
        <div className="sa-head">
          <h1>Pengguna</h1>
          <small>{users.length} pengguna terdaftar</small>
        </div>
        <button className="mt-period light" onClick={() => setExportSheet(true)} aria-label="Ekspor data pengguna">
          <Icon name="download" size={15} />
          <span>Ekspor</span>
        </button>
      </div>
      {notice && (
        <p className="mt-saved" role="status">
          <Icon name="check" size={16} strokeWidth={2.6} /> {notice}
        </p>
      )}
      <div className="sa-counts" aria-label="Ringkasan pengguna per role">
        {userRoles.map((item) => (
          <div key={item}>
            <span className="mt-stat-icon">
              <Icon name={roleIcon[item]} size={18} />
            </span>
            <p>
              <small>{item}</small>
              <strong>{idNumber(users.filter((user) => user.role === item).length, 0)}</strong>
            </p>
          </div>
        ))}
      </div>

      <button className="mt-cta first" onClick={() => setAdding(true)}>
        <Icon name="plus" size={22} strokeWidth={2.4} /> Tambah pengguna
      </button>

      <label className="mt-search">
        <Icon name="search" size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari nama, kode, telepon, atau email"
          aria-label="Cari pengguna"
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="Hapus pencarian">
            Hapus
          </button>
        )}
      </label>
      <div className="sa-chips scroll" role="group" aria-label="Filter role">
        {(['Semua', ...userRoles] as const).map((item) => (
          <button
            key={item}
            className={filter === item ? 'on' : ''}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item === 'Semua' ? 'Semua' : item}
          </button>
        ))}
      </div>

      <section className="mt-panel mt-list">
        {shown.length === 0 && <p className="mt-hint">Pengguna tidak ditemukan.</p>}
        {shown.map((user) => (
          <button key={user.id} className="mt-member" onClick={() => setOpen(user)}>
            <span className="mt-avatar">{memberInitials(user.name)}</span>
            <span className="mt-member-info">
              <strong>{user.name}</strong>
              <small>
                {user.role} · {user.id}
              </small>
            </span>
            <Icon name="chevron" size={16} />
          </button>
        ))}
      </section>

      {open && !editing && !deleting && (
        <div className="modal-backdrop" onClick={() => setOpen(null)}>
          <section className="promo-sheet gp-sheet mt-picker mt-scroll" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setOpen(null)} aria-label="Tutup" />
            <div className="mt-member-head">
              <span className="mt-avatar big">{memberInitials(open.name)}</span>
              <div>
                <h2>{open.name}</h2>
                <small>{open.id}</small>
              </div>
            </div>
            <div className="sa-detail sa-user-detail">
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>
                    <span className="sa-tags">
                      <i>{open.role}</i>
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>No. telepon</dt>
                  <dd>
                    <a href={`tel:${open.phone.replace(/[\s-]/g, '')}`}>{open.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{open.email}</dd>
                </div>
                <div>
                  <dt>Kompos station</dt>
                  <dd>{stationName(open.stationId)}</dd>
                </div>
              </dl>
            </div>
            <div className="sa-actions">
              <button onClick={() => setEditing(open)}>
                <Icon name="edit" size={16} /> Edit
              </button>
              <button className="danger" onClick={() => setDeleting(open)}>
                <Icon name="trash" size={16} /> Hapus
              </button>
            </div>
          </section>
        </div>
      )}

      {exportSheet && (
        <ExportSheet
          note={`${shown.length} pengguna akan diekspor, sesuai filter role dan pencarian saat ini.`}
          busy={busy}
          disabled={shown.length === 0}
          onExport={exportAs}
          onClose={() => setExportSheet(false)}
        />
      )}

      {adding && (
        <div className="modal-backdrop" onClick={() => setAdding(false)}>
          <section className="promo-sheet gp-sheet mt-picker mt-scroll" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setAdding(false)} aria-label="Tutup" />
            <h2>Tambah pengguna</h2>
            <UserForm stations={stations} submitLabel="Tambah pengguna" onSubmit={add} />
          </section>
        </div>
      )}

      {editing && (
        <div className="modal-backdrop" onClick={() => setEditing(null)}>
          <section className="promo-sheet gp-sheet mt-picker mt-scroll" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setEditing(null)} aria-label="Tutup" />
            <h2>Edit pengguna</h2>
            <UserForm key={editing.id} initial={editing} stations={stations} submitLabel="Simpan perubahan" onSubmit={save} />
          </section>
        </div>
      )}

      {deleting && (
        <div className="modal-backdrop" onClick={() => setDeleting(null)}>
          <section className="promo-sheet gp-sheet" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setDeleting(null)} aria-label="Tutup" />
            <h2>Hapus {deleting.name}?</h2>
            <p>
              {txCount > 0 ? (
                <>
                  Pengguna ini memiliki <b>{txCount} data transaksi BSO</b>. Data tersebut akan ikut terhapus dan tidak
                  dapat dikembalikan.
                </>
              ) : (
                'Pengguna ini belum memiliki data transaksi. Akun yang dihapus tidak dapat dikembalikan.'
              )}
            </p>
            <p>Apakah Anda yakin ingin menghapus?</p>
            <div className="gp-confirm sheet-confirm">
              <div>
                <button onClick={() => setDeleting(null)}>Batal</button>
                <button className="strong danger" onClick={remove}>
                  Ya, hapus
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

// ---- Detail laporan: stok kompos dan NOC tersedia per lokasi mitra ----
// Bojonegoro memakai data nyata role Mitra; lokasi lain berupa data contoh (kelipatan dari data Mitra).
const stockFactor: Record<string, number> = { 'PKG-0001': 1, 'PKG-0002': 1.4, 'PKG-0003': 0.8 }

function stationStock(station: Station, period: string, productions: Production[], pickups: Pickup[]) {
  const factor = stockFactor[station.id] ?? 0
  const base = mitraSummary(period, productions, pickups)
  const scale = (value: number) => Math.round(value * factor * 10) / 10
  const history = pickups
    .filter((item) => period === 'Semua bulan' || periodOf(item.date) === period)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => ({ id: item.id, date: item.date, kompos: scale(item.kompos ?? 0), noc: scale(item.noc ?? 0), taker: item.taker }))
    .filter((item) => item.kompos > 0 || item.noc > 0)
  return {
    kompos: scale(base.tersedia),
    noc: scale(base.nocTersedia),
    diambilKompos: scale(base.diambil),
    diambilNoc: scale(base.nocDiambil),
    last: factor > 0 ? base.lastTersedia : '',
    history,
  }
}

const longDate = (iso: string) => `${Number(iso.slice(8, 10))} ${monthNames[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`

// ---- Ekspor laporan stok (Excel / PDF), berbeda isi untuk tab Ringkasan dan Grafik ----
type ReportStationRow = { station: Station; stock: ReturnType<typeof stationStock> }
type ReportData = {
  rows: ReportStationRow[]
  totalKompos: number
  totalNoc: number
  diambilKompos: number
  diambilNoc: number
  last: string
  months: { name: string; kompos: number; noc: number }[]
  history: { lokasi: string; date: string; kompos: number; noc: number; taker: string }[]
}

const shortStation = (name: string) => name.replace('PKG Cabang ', '')

async function reportToXlsx(view: 'ringkasan' | 'grafik', data: ReportData, year: number) {
  const { default: writeXlsxFile } = await import('write-excel-file/browser')
  const head = (labels: string[]) => labels.map((value) => ({ value, fontWeight: 'bold' as const, backgroundColor: '#E7F0D0' }))
  if (view === 'ringkasan') {
    const body = data.rows.map(({ station, stock }) => [
      station.name,
      station.mitra,
      stock.kompos,
      stock.noc,
      stock.diambilKompos,
      stock.diambilNoc,
      stock.last ? longDate(stock.last) : '-',
    ])
    const total = [
      { value: 'Total', fontWeight: 'bold' as const },
      '',
      { value: data.totalKompos, fontWeight: 'bold' as const },
      { value: data.totalNoc, fontWeight: 'bold' as const },
      { value: data.diambilKompos, fontWeight: 'bold' as const },
      { value: data.diambilNoc, fontWeight: 'bold' as const },
      data.last ? longDate(data.last) : '-',
    ]
    return writeXlsxFile([
      {
        sheet: 'Stok per lokasi',
        data: [head(['Lokasi', 'Mitra', 'Kompos tersedia (kg)', 'NOC tersedia (L)', 'Kompos diambil (kg)', 'NOC diambil (L)', 'Update terakhir']), ...body, total],
        columns: [{ width: 26 }, { width: 28 }, { width: 20 }, { width: 18 }, { width: 20 }, { width: 18 }, { width: 18 }],
      },
      {
        sheet: 'Riwayat diambil',
        data: [
          head(['Lokasi', 'Tanggal', 'Kompos (kg)', 'NOC (L)', 'Pengambil']),
          ...data.history.map((item) => [item.lokasi, longDate(item.date), item.kompos, item.noc, item.taker]),
        ],
        columns: [{ width: 26 }, { width: 16 }, { width: 14 }, { width: 12 }, { width: 26 }],
      },
    ]).toBlob()
  }
  return writeXlsxFile([
    {
      sheet: 'Per lokasi',
      data: [
        head(['Lokasi', 'Kompos tersedia (kg)', 'Kompos diambil (kg)', 'NOC tersedia (L)', 'NOC diambil (L)']),
        ...data.rows.map(({ station, stock }) => [station.name, stock.kompos, stock.diambilKompos, stock.noc, stock.diambilNoc]),
      ],
      columns: [{ width: 26 }, { width: 22 }, { width: 22 }, { width: 20 }, { width: 18 }],
    },
    {
      sheet: `Tren ${year}`,
      data: [head(['Bulan', 'Kompos tersedia (kg)', 'NOC tersedia (L)']), ...data.months.map((m) => [m.name, m.kompos, m.noc])],
      columns: [{ width: 12 }, { width: 22 }, { width: 20 }],
    },
  ]).toBlob()
}

type PdfDoc = import('jspdf').jsPDF

function drawBars(
  doc: PdfDoc,
  opts: { x: number; y: number; w: number; h: number; title: string; labels: string[]; values: number[]; highlight?: number },
) {
  const { x, y, w, h, title, labels, values, highlight } = opts
  doc.setFontSize(10)
  doc.setTextColor(20, 48, 31)
  doc.text(title, x, y)
  const base = y + h - 14
  const top = y + 22
  const plot = base - top
  const max = Math.max(...values, 1)
  const gap = values.length > 6 ? 5 : 14
  const bw = (w - gap * (values.length - 1)) / values.length
  doc.setDrawColor(210, 214, 206)
  doc.line(x, base, x + w, base)
  values.forEach((value, index) => {
    const bh = value > 0 ? Math.max((value / max) * plot, 2) : 0
    const bx = x + index * (bw + gap)
    const on = highlight === undefined || highlight === index
    if (on) doc.setFillColor(31, 77, 44)
    else doc.setFillColor(185, 201, 166)
    doc.rect(bx, base - bh, bw, bh, 'F')
    doc.setFontSize(7)
    doc.setTextColor(70)
    if (on) doc.text(idNumber(value), bx + bw / 2, base - bh - 3, { align: 'center' })
    doc.text(labels[index], bx + bw / 2, base + 10, { align: 'center' })
  })
}

async function reportToPdf(view: 'ringkasan' | 'grafik', data: ReportData, meta: { subtitle: string; year: number; selected: number }) {
  const [{ jsPDF }, { autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')])
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const tableStyle = {
    margin: { left: 40, right: 40 },
    styles: { fontSize: 8, cellPadding: 4 },
    headStyles: { fillColor: [31, 77, 44] as [number, number, number] },
    alternateRowStyles: { fillColor: [247, 250, 238] as [number, number, number] },
  }
  doc.setFontSize(15)
  doc.text(view === 'ringkasan' ? 'Detail Laporan Stok Tersedia' : 'Grafik Stok Tersedia', 40, 42)
  doc.setFontSize(9)
  doc.setTextColor(110)
  doc.text(meta.subtitle, 40, 58)
  doc.setFontSize(10)
  doc.setTextColor(20, 48, 31)
  doc.text(
    `Total kompos tersedia ${idNumber(data.totalKompos)} kg  ·  Total NOC tersedia ${idNumber(data.totalNoc)} L  ·  ${data.rows.length} lokasi mitra  ·  Update terakhir ${data.last ? longDate(data.last) : '-'}`,
    40,
    78,
  )

  if (view === 'ringkasan') {
    autoTable(doc, {
      ...tableStyle,
      startY: 92,
      head: [['Lokasi', 'Mitra', 'Kompos tersedia (kg)', 'NOC tersedia (L)', 'Kompos diambil (kg)', 'NOC diambil (L)', 'Update terakhir']],
      body: data.rows.map(({ station, stock }) => [
        station.name,
        station.mitra,
        idNumber(stock.kompos),
        idNumber(stock.noc),
        idNumber(stock.diambilKompos),
        idNumber(stock.diambilNoc),
        stock.last ? longDate(stock.last) : '-',
      ]),
      foot: [['Total', '', idNumber(data.totalKompos), idNumber(data.totalNoc), idNumber(data.diambilKompos), idNumber(data.diambilNoc), data.last ? longDate(data.last) : '-']],
      footStyles: { fillColor: [231, 240, 208], textColor: [20, 48, 31] },
    })
    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY
    doc.setFontSize(11)
    doc.setTextColor(20, 48, 31)
    doc.text('Riwayat diambil', 40, finalY + 28)
    autoTable(doc, {
      ...tableStyle,
      startY: finalY + 36,
      head: [['Lokasi', 'Tanggal', 'Kompos (kg)', 'NOC (L)', 'Pengambil']],
      body: data.history.length
        ? data.history.map((item) => [item.lokasi, longDate(item.date), idNumber(item.kompos), idNumber(item.noc), item.taker])
        : [['Belum ada pengambilan pada periode ini', '', '', '', '']],
    })
  } else {
    const labels = data.rows.map((row) => shortStation(row.station.name))
    const monthLabels = data.months.map((m) => m.name)
    const W = 360
    drawBars(doc, { x: 40, y: 100, w: W, h: 190, title: 'Kompos tersedia per lokasi (kg)', labels, values: data.rows.map((r) => r.stock.kompos) })
    drawBars(doc, { x: 442, y: 100, w: W, h: 190, title: 'NOC tersedia per lokasi (L)', labels, values: data.rows.map((r) => r.stock.noc) })
    drawBars(doc, { x: 40, y: 310, w: W, h: 190, title: `Tren kompos tersedia ${meta.year} (kg)`, labels: monthLabels, values: data.months.map((m) => m.kompos), highlight: meta.selected >= 0 ? meta.selected : undefined })
    drawBars(doc, { x: 442, y: 310, w: W, h: 190, title: `Tren NOC tersedia ${meta.year} (L)`, labels: monthLabels, values: data.months.map((m) => m.noc), highlight: meta.selected >= 0 ? meta.selected : undefined })
    autoTable(doc, {
      ...tableStyle,
      startY: 520,
      head: [['Lokasi', 'Kompos tersedia (kg)', 'Kompos diambil (kg)', 'NOC tersedia (L)', 'NOC diambil (L)']],
      body: data.rows.map(({ station, stock }) => [station.name, idNumber(stock.kompos), idNumber(stock.diambilKompos), idNumber(stock.noc), idNumber(stock.diambilNoc)]),
    })
  }
  return doc.output('blob')
}

function ExportSheet({
  note,
  busy,
  disabled,
  onExport,
  onClose,
}: {
  note: string
  busy: string
  disabled?: boolean
  onExport: (kind: 'xlsx' | 'pdf') => void
  onClose: () => void
}) {
  return (
    <div className="modal-backdrop" onClick={() => !busy && onClose()}>
      <section className="promo-sheet gp-sheet mt-picker" onClick={(event) => event.stopPropagation()}>
        <button className="sheet-handle" onClick={onClose} aria-label="Tutup" />
        <h2>Ekspor data</h2>
        <p className="mt-hint">{note}</p>
        <div className="sa-export">
          {(
            [
              ['xlsx', 'Excel (.xlsx)', 'Tabel lengkap, bisa diedit di Excel'],
              ['pdf', 'PDF', 'Laporan siap cetak atau dibagikan'],
            ] as const
          ).map(([kind, title, hint]) => (
            <button key={kind} className="mt-all" disabled={disabled || Boolean(busy)} onClick={() => onExport(kind)}>
              <Icon name="download" size={20} />
              <span>
                <b>{title}</b>
                <small>{busy === kind ? 'Menyiapkan file…' : hint}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function LineChart({
  labels,
  values,
  selected,
  showAll = false,
}: {
  labels: string[]
  values: number[]
  selected?: number
  showAll?: boolean
}) {
  const n = values.length
  if (!n) return null
  const peak = Math.max(...values, 1)
  const x = (index: number) => ((index + 0.5) / n) * 100
  const y = (value: number) => 100 - Math.max((value / peak) * 80, 2)
  const line = values.map((value, index) => `${x(index)},${y(value)}`).join(' ')
  return (
    <div className="mt-line">
      <div className="mt-line-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points={`${x(0)},100 ${line} ${x(n - 1)},100`} className="area" />
          <polyline points={line} className="stroke" vectorEffect="non-scaling-stroke" />
        </svg>
        {values.map((value, index) => (
          <i
            key={labels[index]}
            className={index === selected ? 'dot on' : 'dot'}
            style={{ left: `${x(index)}%`, top: `${y(value)}%` }}
          >
            {(showAll || index === selected) && <b>{idNumber(value)}</b>}
          </i>
        ))}
      </div>
      <div className="mt-line-labels" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {labels.map((text) => (
          <small key={text}>{text}</small>
        ))}
      </div>
    </div>
  )
}

function AdminReport({
  stations,
  period,
  scopeLabel,
  productions,
  pickups,
  onPick,
}: {
  stations: Station[]
  period: string
  scopeLabel: string
  productions: Production[]
  pickups: Pickup[]
  onPick: () => void
}) {
  const [view, setView] = useState<'ringkasan' | 'grafik'>('ringkasan')
  const [metric, setMetric] = useState<'kompos' | 'noc'>('kompos')
  const [chartType, setChartType] = useState<'batang' | 'garis'>('batang')
  const [detailId, setDetailId] = useState<string | null>(null)
  const [exportOpen, setExportOpen] = useState(false)
  const [busy, setBusy] = useState('')
  const [notice, setNotice] = useState('')
  const rows = stations.map((station) => ({ station, stock: stationStock(station, period, productions, pickups) }))
  const totalKompos = rows.reduce((sum, row) => sum + row.stock.kompos, 0)
  const totalNoc = rows.reduce((sum, row) => sum + row.stock.noc, 0)
  const diambilKompos = rows.reduce((sum, row) => sum + row.stock.diambilKompos, 0)
  const diambilNoc = rows.reduce((sum, row) => sum + row.stock.diambilNoc, 0)
  const last = rows.reduce((max, row) => (row.stock.last > max ? row.stock.last : max), '')
  const detail = rows.find((row) => row.station.id === detailId)
  const year = period === 'Semua bulan' ? 2026 : Number(period.slice(-4))
  const selected = monthNames.findIndex((name) => period === `${name} ${year}`)
  const factorSum = stations.reduce((sum, station) => sum + (stockFactor[station.id] ?? 0), 0)
  const months = monthNames.map((name) => {
    const base = mitraSummary(`${name} ${year}`, productions, pickups)
    return {
      name,
      kompos: Math.round(base.tersedia * factorSum * 10) / 10,
      noc: Math.round(base.nocTersedia * factorSum * 10) / 10,
    }
  })
  const history = rows
    .flatMap(({ station, stock }) => stock.history.map((item) => ({ lokasi: station.name, date: item.date, kompos: item.kompos, noc: item.noc, taker: item.taker })))
    .sort((a, b) => b.date.localeCompare(a.date))

  async function exportAs(kind: 'xlsx' | 'pdf') {
    setBusy(kind)
    try {
      const data: ReportData = { rows, totalKompos, totalNoc, diambilKompos, diambilNoc, last, months, history }
      const today = new Date()
      const subtitle = `Periode ${period}  ·  ${scopeLabel}  ·  Dibuat ${today.getDate()} ${adminMonths[today.getMonth()]} ${today.getFullYear()}`
      const blob = kind === 'xlsx' ? await reportToXlsx(view, data, year) : await reportToPdf(view, data, { subtitle, year, selected })
      saveBlob(blob, `laporan-stok-${view}-${today.toISOString().slice(0, 10)}.${kind}`)
      setNotice(`Laporan ${view === 'ringkasan' ? 'Ringkasan' : 'Grafik'} diekspor ke ${kind === 'xlsx' ? 'Excel' : 'PDF'}.`)
      setExportOpen(false)
    } catch {
      setNotice('Ekspor gagal. Coba lagi.')
    } finally {
      setBusy('')
    }
  }

  if (detail) {
    const { station, stock } = detail
    return (
      <>
        <div className="mt-graph-head">
          <button className="icon-button" onClick={() => setDetailId(null)} aria-label="Kembali ke Detail Laporan">
            <Icon name="back" />
          </button>
          <div className="sa-head sa-head-back">
            <h1>{station.name}</h1>
            <small>
              {station.mitra} · {period}
            </small>
          </div>
        </div>

        <section className="mt-panel">
          <h2>Stok tersedia</h2>
          <div className="mt-usage-grid">
            <div>
              <span className="mt-stat-icon">
                <Icon name="sprout" size={18} />
              </span>
              <p>
                <small>Kompos tersedia</small>
                <strong>
                  {idNumber(stock.kompos)} <em>kg</em>
                </strong>
              </p>
            </div>
            <div>
              <span className="mt-stat-icon">
                <Icon name="drop" size={18} />
              </span>
              <p>
                <small>NOC tersedia</small>
                <strong>
                  {idNumber(stock.noc)} <em>L</em>
                </strong>
              </p>
            </div>
          </div>
          <p className="sa-updated">
            <Icon name="clock" size={14} />
            {stock.last ? `Update terakhir ${longDate(stock.last)}` : 'Belum ada data'}
          </p>
        </section>

        <section className="mt-panel">
          <h2>Riwayat diambil</h2>
          <div className="mt-usage-grid">
            <div>
              <span className="mt-stat-icon">
                <Icon name="truck" size={18} />
              </span>
              <p>
                <small>Kompos diambil</small>
                <strong>
                  {idNumber(stock.diambilKompos)} <em>kg</em>
                </strong>
              </p>
            </div>
            <div>
              <span className="mt-stat-icon">
                <Icon name="truck" size={18} />
              </span>
              <p>
                <small>NOC diambil</small>
                <strong>
                  {idNumber(stock.diambilNoc)} <em>L</em>
                </strong>
              </p>
            </div>
          </div>
          {stock.history.length === 0 ? (
            <p className="mt-hint sa-history">Belum ada pengambilan pada periode ini.</p>
          ) : (
            <ul className="mt-recent sa-history">
              {stock.history.map((item) => (
                <li key={item.id}>
                  <span className="mt-stat-icon">
                    <Icon name="truck" size={18} />
                  </span>
                  <div>
                    <strong>
                      Kompos {idNumber(item.kompos)} kg · NOC {idNumber(item.noc)} L
                    </strong>
                    <small>
                      {longDate(item.date)} · {item.taker}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </>
    )
  }

  const unit = metric === 'kompos' ? 'kg' : 'L'
  const label = metric === 'kompos' ? 'Kompos' : 'NOC'
  const perStation = rows.map((row) => (metric === 'kompos' ? row.stock.kompos : row.stock.noc))
  const stockNow = metric === 'kompos' ? totalKompos : totalNoc
  const taken = metric === 'kompos' ? diambilKompos : diambilNoc
  const trend = months.map((m) => (metric === 'kompos' ? m.kompos : m.noc))
  const peak = Math.max(...perStation, 1)
  const trendPeak = Math.max(...trend, 1)

  return (
    <>
      <div className="mt-graph-head">
        <div className="sa-head">
          <h1>Detail Laporan</h1>
          <small>Stok tersedia · {scopeLabel}</small>
        </div>
        <div className="sa-head-actions">
          <button className="mt-period light" onClick={onPick} aria-label="Pilih periode">
            <Icon name="calendar" size={15} />
            <span>{period}</span>
            <Icon name="chevron" size={13} />
          </button>
          <button className="mt-period light icon-only" onClick={() => setExportOpen(true)} aria-label="Ekspor laporan">
            <Icon name="download" size={16} />
          </button>
        </div>
      </div>
      {notice && (
        <p className="mt-saved" role="status">
          <Icon name="check" size={16} strokeWidth={2.6} /> {notice}
        </p>
      )}
      <div className="sa-tabbar">
        <div className="sa-tabs" role="tablist" aria-label="Tampilan laporan">
          {(
            [
              ['ringkasan', 'Ringkasan'],
              ['grafik', 'Grafik'],
            ] as const
          ).map(([key, text]) => (
            <button
              key={key}
              role="tab"
              aria-selected={view === key}
              className={view === key ? 'active' : ''}
              onClick={() => {
                setView(key)
                setNotice('')
              }}
            >
              {text}
            </button>
          ))}
        </div>
        {view === 'grafik' && (
          <div className="sa-tools">
            <div className="mt-toggle sm" role="group" aria-label="Jenis stok">
              {(
                [
                  ['kompos', 'Kompos'],
                  ['noc', 'NOC'],
                ] as const
              ).map(([key, text]) => (
                <button key={key} className={metric === key ? 'active' : ''} aria-pressed={metric === key} onClick={() => setMetric(key)}>
                  {text}
                </button>
              ))}
            </div>
            <div className="mt-toggle sm icons" role="group" aria-label="Jenis grafik">
              {(
                [
                  ['batang', 'barchart', 'Grafik batang'],
                  ['garis', 'linechart', 'Grafik garis'],
                ] as const
              ).map(([key, icon, text]) => (
                <button
                  key={key}
                  className={chartType === key ? 'active' : ''}
                  aria-pressed={chartType === key}
                  aria-label={text}
                  title={text}
                  onClick={() => setChartType(key)}
                >
                  <Icon name={icon} size={15} strokeWidth={2.2} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {view === 'ringkasan' ? (
        <>
          <section className="gp-card mt-hero sa-total">
            <svg className="gp-deco deco-b" viewBox="0 0 120 160" aria-hidden="true">
              <path d="M110 6C40 10 6 52 8 108c1 26 18 46 44 46 52 0 62-72 58-148z" />
            </svg>
            <div className="gp-card-top">
              <div>
                <span>Total stok tersedia</span>
              </div>
            </div>
            <div className="sa-total-grid">
              <div>
                <strong>
                  {idNumber(totalKompos)} <small>kg</small>
                </strong>
                <span>Kompos tersedia</span>
              </div>
              <div>
                <strong>
                  {idNumber(totalNoc)} <small>L</small>
                </strong>
                <span>NOC tersedia</span>
              </div>
            </div>
            <p className="mt-hero-sub">
              {rows.length} lokasi mitra <i /> {last ? `Update terakhir ${longDate(last)}` : 'Belum ada data'}
            </p>
          </section>

          <h3 className="mt-sub">Stok per lokasi mitra</h3>
          <section className="mt-panel mt-list" aria-label="Stok per lokasi mitra">
            {rows.length === 0 && <p className="mt-hint">Belum ada kompos station.</p>}
            {rows.map(({ station, stock }) => (
              <button key={station.id} className="mt-member" onClick={() => setDetailId(station.id)}>
                <span className="mt-stat-icon">
                  <Icon name="store" size={18} />
                </span>
                <span className="mt-member-info">
                  <strong>{station.name}</strong>
                  <small>
                    Kompos {idNumber(stock.kompos)} kg · NOC {idNumber(stock.noc)} L
                  </small>
                  <small>{stock.last ? `Update ${longDate(stock.last)}` : 'Belum ada data'}</small>
                </span>
                <Icon name="chevron" size={16} />
              </button>
            ))}
          </section>
        </>
      ) : (
        <>
          <section className="mt-panel">
            <h2>
              {label} tersedia per lokasi ({unit})
            </h2>
            {chartType === 'batang' ? (
              <div className="mt-bars sa-bars">
                {rows.map(({ station }, index) => (
                  <div key={station.id}>
                    <b>{idNumber(perStation[index])}</b>
                    <span className="dark" style={{ height: `${Math.max((perStation[index] / peak) * 100, 3)}%` }} />
                    <small>{shortStation(station.name)}</small>
                  </div>
                ))}
              </div>
            ) : (
              <LineChart labels={rows.map(({ station }) => shortStation(station.name))} values={perStation} showAll />
            )}
            {rows.length === 0 && <p className="mt-hint">Belum ada kompos station.</p>}
          </section>

          <section className="mt-panel">
            <h2>
              {label} tersedia dan diambil ({unit})
            </h2>
            {chartType === 'batang' ? (
              <div className="mt-bars two">
                {(
                  [
                    ['Tersedia', stockNow, 'dark'],
                    ['Diambil', taken, 'light'],
                  ] as const
                ).map(([text, value, tone]) => (
                  <div key={text}>
                    <b>{idNumber(value)}</b>
                    <span className={tone} style={{ height: `${Math.max((value / Math.max(stockNow, taken, 1)) * 100, 3)}%` }} />
                    <small>{text}</small>
                  </div>
                ))}
              </div>
            ) : (
              <LineChart labels={['Tersedia', 'Diambil']} values={[stockNow, taken]} showAll />
            )}
          </section>

          <section className="mt-panel">
            <h2>
              Tren {label.toLowerCase()} tersedia {year} ({unit})
            </h2>
            {chartType === 'batang' ? (
              <div className="mt-bars twelve">
                {months.map((m, index) => {
                  const on = index === selected
                  return (
                    <div key={m.name}>
                      <b>{on ? idNumber(trend[index]) : ''}</b>
                      <span className={on ? 'dark' : 'light'} style={{ height: `${Math.max((trend[index] / trendPeak) * 100, 3)}%` }} />
                      <small>{m.name}</small>
                    </div>
                  )
                })}
              </div>
            ) : (
              <LineChart labels={months.map((m) => m.name)} values={trend} selected={selected >= 0 ? selected : undefined} />
            )}
          </section>
        </>
      )}

      {exportOpen && (
        <ExportSheet
          note={`Laporan ${view === 'ringkasan' ? 'Ringkasan (tabel stok dan riwayat diambil)' : 'Grafik (grafik dan data tren)'} periode ${period}, ${scopeLabel}.`}
          busy={busy}
          disabled={rows.length === 0}
          onExport={exportAs}
          onClose={() => setExportOpen(false)}
        />
      )}
    </>
  )
}

// ---- GladiPoint untuk Super Admin (mengikuti halaman super admin aplikasi saat ini) ----
type AdminTab = 'ringkasan' | 'station' | 'pengguna' | 'laporan' | 'lainnya'

const adminNav: [AdminTab, string, string][] = [
  ['ringkasan', 'home', 'Ringkasan'],
  ['station', 'pin', 'Kompos Station'],
  ['pengguna', 'users', 'Pengguna'],
  ['laporan', 'clipboard', 'Laporan'],
  ['lainnya', 'more', 'Lainnya'],
]

// Data contoh halaman Super Admin (angka dari tampilan aplikasi saat ini).
const adminMonths = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const adminCycle = 'siklus 2.000 kg × 5 per 1.000 kg'

function SuperAdminGladi({
  onBack,
  account,
  setAccount,
  photo,
  setPhoto,
  role,
  setRole,
  productions,
  pickups,
}: {
  onBack: () => void
  account: Account
  setAccount: (account: Account) => void
  photo: string | null
  setPhoto: (photo: string | null) => void
  role: AppRole
  setRole: (role: AppRole) => void
  productions: Production[]
  pickups: Pickup[]
}) {
  const [tab, setTab] = useState<AdminTab>('ringkasan')
  const [akun, setAkun] = useState(false)
  const [period, setPeriod] = useState('Nov 2026')
  const [picker, setPicker] = useState(false)
  const [pickYear, setPickYear] = useState(2026)
  const [stations, setStations] = useState(seedStations)
  const [users, setUsers] = useState(seedUsers)
  const [scope, setScope] = useState('Seluruh cakupan')
  const [scopeSheet, setScopeSheet] = useState(false)
  const [limit, setLimit] = useState(10)
  const [limitSheet, setLimitSheet] = useState(false)
  const [limitInput, setLimitInput] = useState('10')
  const used = 8
  const pct = Math.round((used / limit) * 100)
  const state = pct >= 100 ? 'over' : pct >= 80 ? 'warn' : 'ok'
  const stateLabel = { over: 'Melebihi', warn: 'Waspada', ok: 'Aman' }[state]
  const stateNote = {
    over: 'Melebihi batas — segera hubungi mitra untuk menghentikan pemakaian.',
    warn: 'Mendekati batas — ingatkan mitra untuk mengatur dosis.',
    ok: 'Pemakaian masih dalam batas.',
  }[state]
  const periodLabel =
    period === 'Semua bulan' ? period : `${adminMonths[monthNames.indexOf(period.slice(0, 3))]} ${period.slice(4)}`
  const newLimit = Number(limitInput.replace(',', '.'))
  const adminScopes = ['Seluruh cakupan', ...stations.map((item) => item.name)]
  const activeScope = adminScopes.includes(scope) ? scope : adminScopes[0]
  const scoped = stations.filter((item) => activeScope === adminScopes[0] || item.name === activeScope)
  const bsoTotal = 57.5
  const heroStock = scoped.reduce(
    (sum, station) => {
      const stock = stationStock(station, period, productions, pickups)
      return { kompos: sum.kompos + stock.kompos, noc: sum.noc + stock.noc }
    },
    { kompos: 0, noc: 0 },
  )
  const memberTotal = users.filter(
    (item) => item.role === 'Member Gladi' && scoped.some((station) => station.id === item.stationId),
  ).length

  if (akun) {
    return (
      <AccountPage
        title="Profil Saya"
        role={role}
        setRole={setRole}
        account={account}
        setAccount={setAccount}
        photo={photo}
        setPhoto={setPhoto}
        onBack={() => setAkun(false)}
      />
    )
  }

  return (
    <>
      <main className="page gladi-page mitra-page sa-page">
        <header className="gp-top">
          <button className="icon-button" onClick={onBack} aria-label="Kembali ke AgroFertile">
            <Icon name="back" />
          </button>
          <div className="gp-brand">
            <img src={`${BASE}assets/gladipoint-logo.png`} alt="GladiPoint" />
            <span>Bersama untuk Pertanian Lebih Baik</span>
          </div>
          <button className="gp-bell" aria-label="Notifikasi, 1 baru">
            <Icon name="bell" size={22} />
            <i className="sa-badge">1</i>
          </button>
          <button className="avatar gp-avatar sa-avatar" onClick={() => setAkun(true)} aria-label="Profil Saya">
            {photo ? <img src={photo} alt="" /> : initialsOf(account.name)}
          </button>
        </header>

        {tab === 'ringkasan' ? (
          <>
            <div className="sa-title">
              <h1>Ringkasan program</h1>
              <span className="sa-role">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8z" />
                </svg>
                Super Admin
              </span>
            </div>

            <div className="sa-filters">
              <button className="sa-pill" onClick={() => setPicker(true)} aria-label="Pilih periode">
                <Icon name="calendar" size={18} />
                <span>{periodLabel}</span>
                <Icon name="chevron" size={14} />
              </button>
              <button className="sa-pill" onClick={() => setScopeSheet(true)} aria-label="Pilih cakupan">
                <Icon name="pin" size={18} />
                <span>{activeScope}</span>
                <Icon name="chevron" size={14} />
              </button>
            </div>

            <section className="gp-card mt-hero sa-hero2">
              <svg className="gp-deco deco-b" viewBox="0 0 120 160" aria-hidden="true">
                <path d="M110 6C40 10 6 52 8 108c1 26 18 46 44 46 52 0 62-72 58-148z" />
              </svg>
              <div className="gp-card-top">
                <div>
                  <span>BSO periode terpilih</span>
                </div>
              </div>
              <div className="mt-hero-value">
                <strong>
                  {idNumber(bsoTotal)} <small>kg</small>
                </strong>
              </div>
              <p className="mt-hero-sub">
                {idNumber(bsoTotal / 1000, 4)} ton <i /> Bank Sampah Organik
              </p>
              <div className="sa-hero-stats">
                <button onClick={() => setTab('station')} aria-label={`Buka Kompos Station, ${scoped.length} station`}>
                  <strong>{idNumber(scoped.length, 0)}</strong>
                  <small>
                    Kompos station <Icon name="chevron" size={11} strokeWidth={2.6} />
                  </small>
                </button>
                <button onClick={() => setTab('pengguna')} aria-label={`Buka halaman Pengguna, ${idNumber(memberTotal, 0)} member`}>
                  <strong>{idNumber(memberTotal, 0)}</strong>
                  <small>
                    Member terdaftar <Icon name="chevron" size={11} strokeWidth={2.6} />
                  </small>
                </button>
                <button className="sa-stock" onClick={() => setTab('laporan')} aria-label="Buka Detail Laporan stok tersedia">
                  <div>
                    <strong>
                      {idNumber(heroStock.kompos)} <em>kg</em>
                    </strong>
                    <small>Kompos tersedia</small>
                  </div>
                  <div>
                    <strong>
                      {idNumber(heroStock.noc)} <em>L</em>
                    </strong>
                    <small>NOC tersedia</small>
                  </div>
                  <Icon name="chevron" size={16} />
                </button>
              </div>
            </section>

            <section className="sa-usage">
              <h2>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 4h12v3l-1 13H7L6 7V4z" />
                  <path d="M6 7h12" />
                </svg>
                Pemakaian Gladiator mitra · bulan ini
              </h2>
              <button
                className="sa-limit"
                onClick={() => {
                  setLimitInput(String(limit))
                  setLimitSheet(true)
                }}
              >
                <Icon name="sliders" size={18} /> Atur batas
              </button>
              <div className="sa-usage-row">
                <strong>
                  PKG-0001 · PKG Cabang Bojonegoro <em>(Cair)</em>
                </strong>
                <span className={`sa-state ${state}`}>{stateLabel}</span>
              </div>
              <div className="sa-bar" role="progressbar" aria-valuenow={Math.min(pct, 100)} aria-valuemin={0} aria-valuemax={100}>
                <i className={state} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <p>
                {used} dari {limit} liter ({pct}%) · {adminCycle} · {stateNote}
              </p>
            </section>
          </>
        ) : tab === 'station' ? (
          <AdminStations stations={stations} setStations={setStations} />
        ) : tab === 'laporan' ? (
          <AdminReport
            stations={scoped}
            period={period}
            scopeLabel={activeScope}
            productions={productions}
            pickups={pickups}
            onPick={() => setPicker(true)}
          />
        ) : tab === 'pengguna' ? (
          <AdminUsers users={users} setUsers={setUsers} stations={stations} />
        ) : (
          <div className="empty-card mt-empty">
            <Icon name={adminNav.find(([key]) => key === tab)?.[1] ?? 'info'} size={50} />
            <h3>{adminNav.find(([key]) => key === tab)?.[2]}</h3>
            <p>Halaman ini akan dirancang pada tahap berikutnya.</p>
          </div>
        )}
      </main>

      <nav className="mt-nav sa-nav" aria-label="Navigasi Super Admin">
        {adminNav.map(([key, icon, label]) => (
          <button
            key={key}
            className={tab === key ? 'active' : ''}
            onClick={() => setTab(key)}
            aria-current={tab === key ? 'page' : undefined}
          >
            <Icon name={icon} size={22} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {picker && (
        <MitraPeriodSheet
          period={period}
          setPeriod={setPeriod}
          pickYear={pickYear}
          setPickYear={setPickYear}
          onClose={() => setPicker(false)}
        />
      )}

      {scopeSheet && (
        <div className="modal-backdrop" onClick={() => setScopeSheet(false)}>
          <section className="promo-sheet gp-sheet mt-picker" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setScopeSheet(false)} aria-label="Tutup" />
            <h2>Pilih cakupan</h2>
            <div className="photo-actions role-list">
              {adminScopes.map((item) => (
                <button
                  key={item}
                  className={item === activeScope ? 'current' : ''}
                  onClick={() => {
                    setScope(item)
                    setScopeSheet(false)
                  }}
                >
                  <Icon name="pin" size={22} /> {item}
                  {item === activeScope && <Icon name="check" size={18} strokeWidth={3} />}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {limitSheet && (
        <div className="modal-backdrop" onClick={() => setLimitSheet(false)}>
          <section className="promo-sheet gp-sheet mt-picker" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setLimitSheet(false)} aria-label="Tutup" />
            <h2>Atur batas pemakaian</h2>
            <p className="mt-hint">Batas pemakaian Gladiator Cair per bulan untuk PKG Cabang Bojonegoro.</p>
            <div className="mt-form">
              <label className="mt-field">
                <span>Batas (liter)</span>
                <div className="mt-input-unit">
                  <input
                    inputMode="decimal"
                    value={limitInput}
                    onChange={(event) => setLimitInput(event.target.value.replace(/[^0-9.,]/g, ''))}
                  />
                  <i>L</i>
                </div>
              </label>
              <button
                className="mt-cta"
                disabled={!(newLimit > 0)}
                onClick={() => {
                  setLimit(newLimit)
                  setLimitSheet(false)
                }}
              >
                Simpan batas
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

function MitraGladi({
  onBack,
  account,
  setAccount,
  photo,
  setPhoto,
  role,
  setRole,
  redemptions,
  onConfirmRedemption,
  productions,
  setProductions,
  pickups,
  setPickups,
}: {
  onBack: () => void
  account: Account
  setAccount: (account: Account) => void
  photo: string | null
  setPhoto: (photo: string | null) => void
  role: AppRole
  setRole: (role: AppRole) => void
  redemptions: Redemption[]
  onConfirmRedemption: (id: string, received: NonNullable<Redemption['received']>) => void
  productions: Production[]
  setProductions: React.Dispatch<React.SetStateAction<Production[]>>
  pickups: Pickup[]
  setPickups: React.Dispatch<React.SetStateAction<Pickup[]>>
}) {
  const [page, setPage] = useState<MitraTab>('ringkasan')
  const [akun, setAkun] = useState(false)
  const [period, setPeriod] = useState('Nov 2026')
  const [picker, setPicker] = useState(false)
  const [trendType, setTrendType] = useState<'batang' | 'garis'>('batang')
  const [pickYear, setPickYear] = useState(2026)
  const [usage, setUsage] = useState(seedUsage)
  const waiting = redemptions.filter((item) => !item.received).length
  const gladiator = usageTotals(period, usage)
  const myRank = mitraRanking(period).findIndex((row) => row.me) + 1
  const mitraCount = mitraRanking(period).length
  const data = mitraSummary(period, productions, pickups)

  if (akun) {
    return (
      <AccountPage
        title="Profil Saya"
        role={role}
        setRole={setRole}
        account={account}
        setAccount={setAccount}
        photo={photo}
        setPhoto={setPhoto}
        onBack={() => setAkun(false)}
      />
    )
  }

  const ledger = [
    ['sprout', 'Hasil Produksi', data.jadi, data.nocJadi, 'produksi', data.lastProduksi],
    ['truck', 'Stok Diambil', data.diambil, data.nocDiambil, 'pengambilan', data.lastDiambil],
    ['box', 'Stok Tersedia', data.tersedia, data.nocTersedia, '', data.lastTersedia],
  ] as const

  return (
    <>
      <main className="page gladi-page mitra-page">
        <header className="gp-top">
          <button
            className="icon-button"
            onClick={page !== 'ringkasan' ? () => setPage('ringkasan') : onBack}
            aria-label={page !== 'ringkasan' ? 'Kembali ke Ringkasan' : 'Kembali ke AgroFertile'}
          >
            <Icon name="back" />
          </button>
          <div className="gp-brand">
            <img src={`${BASE}assets/gladipoint-logo.png`} alt="GladiPoint" />
            <span>Bersama untuk Pertanian Lebih Baik</span>
          </div>
          <button className="gp-bell" aria-label="Notifikasi">
            <Icon name="bell" size={22} />
          </button>
          <button className="avatar gp-avatar" onClick={() => setAkun(true)} aria-label="Profil Saya">
            {photo ? <img src={photo} alt="" /> : initialsOf(account.name)}
          </button>
        </header>

        {page === 'ringkasan' ? (
          <>
            <section
              className="gp-card mt-hero"
              role="button"
              tabIndex={0}
              onClick={() => setPage('grafik')}
              onKeyDown={(event) => event.key === 'Enter' && setPage('grafik')}
              aria-label="Buka grafik operasional"
            >
              <svg className="gp-deco deco-b" viewBox="0 0 120 160" aria-hidden="true">
                <path d="M110 6C40 10 6 52 8 108c1 26 18 46 44 46 52 0 62-72 58-148z" />
              </svg>
              <div className="gp-card-top">
                <div>
                  <span>BSO periode terpilih</span>
                </div>
                <button
                  className="mt-period"
                  onClick={(event) => {
                    event.stopPropagation()
                    setPicker(true)
                  }}
                  aria-label="Pilih periode"
                >
                  <Icon name="calendar" size={15} />
                  <span>{period}</span>
                  <Icon name="chevron" size={13} />
                </button>
              </div>
              <div className="mt-hero-value">
                <strong>
                  {idNumber(data.bso)} <small>kg</small>
                </strong>
              </div>
              <p className="mt-hero-sub">
                {idNumber(data.bso / 1000, 4)} ton <i /> Sampah Organik terkumpul
              </p>
              <div className="mt-hero-owner">
                <Icon name="user" size={16} />
                <strong>{account.name}</strong>
              </div>
            </section>

            <section className="mt-ledger" aria-label="Ringkasan kompos dan NOC">
              <div className="mt-ledger-head">
                <span />
                <span>Kompos</span>
                <span>NOC</span>
                <span />
              </div>
              {ledger.map(([icon, label, kompos, noc, target, updated]) => {
                const content = (
                  <>
                    <span className="mt-ledger-label">
                      <span className="mt-stat-icon">
                        <Icon name={icon} size={20} />
                      </span>
                      <span>
                        {label}
                        <small>{updated ? `Update ${shortDate(updated)} ${updated.slice(0, 4)}` : 'Belum ada data'}</small>
                      </span>
                    </span>
                    <strong>
                      {idNumber(kompos)} <small>kg</small>
                    </strong>
                    <strong>
                      {idNumber(noc)} <small>L</small>
                    </strong>
                    <span className="mt-ledger-go">{target && <Icon name="chevron" size={16} />}</span>
                  </>
                )
                return target ? (
                  <button className="mt-ledger-row action" key={label} onClick={() => setPage(target)}>
                    {content}
                  </button>
                ) : (
                  <div className="mt-ledger-row" key={label}>
                    {content}
                  </div>
                )
              })}
            </section>

            <div className="mt-mini-grid one">
              <button onClick={() => setPage('hadiah')}>
                <span className="mt-stat-icon">
                  <Icon name="gift" size={18} />
                </span>
                <p>
                  <small>Rekap hadiah</small>
                  <strong className="clip">
                    {waiting > 0 ? `${waiting} hadiah menunggu konfirmasi` : 'Semua hadiah sudah diterima'}
                  </strong>
                </p>
                <Icon name="chevron" size={16} />
              </button>
            </div>

            <button className="mt-usage" onClick={() => setPage('gladiator')}>
              <div className="mt-usage-head">
                <strong>Pemakaian Gladiator</strong>
                <small>{gladiator.last ? `Update ${shortDate(gladiator.last)} ${gladiator.last.slice(0, 4)}` : 'Belum ada data'}</small>
                <Icon name="chevron" size={16} />
              </div>
              <div className="mt-usage-grid">
                <div>
                  <span className="mt-stat-icon">
                    <Icon name="drop" size={18} />
                  </span>
                  <p>
                    <small>Gladiator Cair</small>
                    <strong>
                      {idNumber(gladiator.cair)} <em>L</em>
                    </strong>
                  </p>
                </div>
                <div>
                  <span className="mt-stat-icon">
                    <Icon name="box" size={18} />
                  </span>
                  <p>
                    <small>Gladiator Padat</small>
                    <strong>
                      {idNumber(gladiator.padat)} <em>kg</em>
                    </strong>
                  </p>
                </div>
              </div>
            </button>

            <div className="mt-mini-grid">
              <button onClick={() => setPage('member')}>
                <span className="mt-stat-icon">
                  <Icon name="users" size={18} />
                </span>
                <p>
                  <small>Member penyetor</small>
                  <strong>
                    {mitraMembers.length} <em>member</em>
                  </strong>
                </p>
                <Icon name="chevron" size={16} />
              </button>
              <button onClick={() => setPage('peringkat')}>
                <span className="mt-stat-icon">
                  <Icon name="trophy" size={18} />
                </span>
                <p>
                  <small>Peringkat</small>
                  <strong className="clip">{myRank ? `#${myRank} dari ${mitraCount} mitra` : 'Belum ada data'}</strong>
                </p>
                <Icon name="chevron" size={16} />
              </button>
            </div>
          </>
        ) : page === 'tersedia' ? (
          <MitraStock data={data} period={period} onPick={() => setPicker(true)} />
        ) : page === 'hadiah' ? (
          <MitraRewards
            records={redemptions}
            onConfirm={onConfirmRedemption}
          />
        ) : page === 'member' ? (
          <MitraMembers />
        ) : page === 'peringkat' ? (
          <MitraRanking period={period} onPick={() => setPicker(true)} />
        ) : page === 'gladiator' ? (
          <MitraGladiator records={usage} onSave={(item) => setUsage((list) => [...list, item])} />
        ) : page === 'pengambilan' ? (
          <MitraPickup pickups={pickups} records={productions} onSave={(item) => setPickups((list) => [...list, item])} />
        ) : page === 'produksi' ? (
          <MitraProduction records={productions} onSave={(item) => setProductions((list) => [...list, item])} />
        ) : page === 'grafik' ? (
          <>
            <div className="mt-graph-head">
              <h1>Grafik operasional</h1>
            </div>

            <section className="mt-panel">
              <h2>Komposisi sampah organik</h2>
              <div className="mt-split" role="img" aria-label="Basah 55 persen, kering 45 persen">
                <span style={{ flex: 55 }}>55%</span>
                <span style={{ flex: 45 }}>45%</span>
              </div>
              <div className="mt-legend">
                <div>
                  <i className="wet" /> Basah
                  <strong>{idNumber(data.bso * 0.55)} kg</strong>
                </div>
                <div>
                  <i className="dry" /> Kering
                  <strong>{idNumber(data.bso * 0.45)} kg</strong>
                </div>
              </div>
            </section>

            <section className="mt-panel">
              <h2>Kompos periode terpilih</h2>
              <div className="mt-bars two">
                {[
                  ['Jadi', data.jadi, 'light'],
                  ['Diambil', data.diambil, 'dark'],
                ].map(([label, value, tone]) => (
                  <div key={label as string}>
                    <b>{idNumber(value as number)}</b>
                    <span
                      className={tone as string}
                      style={{ height: `${Math.max(((value as number) / Math.max(data.jadi, data.diambil, 1)) * 100, 3)}%` }}
                    />
                    <small>{label as string}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-panel">
              <div className="mt-panel-head">
                <h2>Tren sampah organik</h2>
                <div className="mt-toggle" role="tablist" aria-label="Jenis grafik">
                  {(['batang', 'garis'] as const).map((type) => (
                    <button
                      key={type}
                      role="tab"
                      aria-selected={trendType === type}
                      className={trendType === type ? 'active' : ''}
                      onClick={() => setTrendType(type)}
                    >
                      {type === 'batang' ? 'Batang' : 'Garis'}
                    </button>
                  ))}
                </div>
              </div>
              {(() => {
                const year = period === 'Semua bulan' ? 2026 : Number(period.slice(-4))
                const values = monthNames.map((name) => mitraPeriods[`${name} ${year}`].bso)
                const peak = Math.max(...values, 1)
                const selectedIndex = monthNames.findIndex((name) => period === `${name} ${year}`)
                const pointX = (index: number) => ((index + 0.5) / 12) * 100
                const pointY = (value: number) => 100 - Math.max((value / peak) * 100, 2)
                if (trendType === 'batang') {
                  return (
                    <div className="mt-bars twelve">
                      {monthNames.map((name, index) => {
                        const selected = index === selectedIndex
                        return (
                          <div key={name}>
                            <b>{selected ? idNumber(values[index]) : ''}</b>
                            <span
                              className={selected ? 'dark' : 'light'}
                              style={{ height: `${Math.max((values[index] / peak) * 100, 3)}%` }}
                            />
                            <small>{name}</small>
                          </div>
                        )
                      })}
                    </div>
                  )
                }
                const line = values.map((value, index) => `${pointX(index)},${pointY(value)}`).join(' ')
                return (
                  <div className="mt-line">
                    <div className="mt-line-plot">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <polygon points={`${pointX(0)},100 ${line} ${pointX(11)},100`} className="area" />
                        <polyline points={line} className="stroke" vectorEffect="non-scaling-stroke" />
                      </svg>
                      {values.map((value, index) => (
                        <i
                          key={monthNames[index]}
                          className={index === selectedIndex ? 'dot on' : 'dot'}
                          style={{ left: `${pointX(index)}%`, top: `${pointY(value)}%` }}
                        >
                          {index === selectedIndex && <b>{idNumber(value)}</b>}
                        </i>
                      ))}
                    </div>
                    <div className="mt-line-labels">
                      {monthNames.map((name) => (
                        <small key={name}>{name}</small>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </section>
          </>
        ) : (
          <div className="empty-card mt-empty">
            <Icon name={mitraNav.find(([key]) => key === page)?.[1] ?? 'info'} size={50} />
            <h3>{mitraNav.find(([key]) => key === page)?.[2]}</h3>
            <p>Halaman ini akan dirancang pada tahap berikutnya.</p>
          </div>
        )}
      </main>

      <nav className="mt-nav" aria-label="Navigasi Mitra">
        {(
          [
            ['produksi', 'sprout', 'Hasil Produksi'],
            ['pengambilan', 'truck', 'Stok Diambil'],
            ['bso', 'plus', 'Catat BSO'],
            ['tersedia', 'box', 'Stok Tersedia'],
            ['grafik', 'activity', 'Detail Operasi'],
          ] as const
        ).map(([key, icon, label]) =>
          key === 'bso' ? (
            <button
              key={key}
              className={`mt-nav-fab${page === key ? ' active' : ''}`}
              onClick={() => setPage(key)}
              aria-label={label}
              aria-current={page === key ? 'page' : undefined}
            >
              <Icon name={icon} size={26} strokeWidth={2.6} />
            </button>
          ) : (
            <button
              key={key}
              className={page === key ? 'active' : ''}
              onClick={() => setPage(page === key ? 'ringkasan' : key)}
              aria-current={page === key ? 'page' : undefined}
            >
              <Icon name={icon} size={22} />
              <span>{label}</span>
            </button>
          ),
        )}
      </nav>

      {picker && (
        <MitraPeriodSheet
          period={period}
          setPeriod={setPeriod}
          pickYear={pickYear}
          setPickYear={setPickYear}
          onClose={() => setPicker(false)}
        />
      )}

    </>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [points, setPoints] = useState(GLADI_POINTS)
  const [activities, setActivities] = useState(initialActivities)
  const [redemptions, setRedemptions] = useState(seedRedemptions)
  // Stok mitra dipakai bersama: role Mitra mencatat, role Petani hanya melihat.
  const [productions, setProductions] = useState(seedProductions)
  const [pickups, setPickups] = useState(seedPickups)
  const [photo, setPhoto] = useState<string | null>(null)
  const [role, setRole] = useState<AppRole>('Petani')
  const [accounts, setAccounts] = useState<Partial<Record<AppRole, Account>>>({})
  // Tiap role punya akun sendiri; Mitra memakai nama khusus agar tidak membingungkan.
  const account =
    accounts[role] ??
    (role === 'Mitra'
      ? { ...initialAccount, name: 'Mitra Bojonegoro Kanwil I', email: 'mitra.bojonegoro@agrifertile.com' }
      : role === 'Super Admin'
        ? { ...initialAccount, name: 'Super Admin AgroFertile', email: 'superadmin@agrifertile.com' }
        : initialAccount)
  const setAccount = (next: Account) => setAccounts((current) => ({ ...current, [role]: next }))
  const [consultFrom, setConsultFrom] = useState<Tab>('spring')

  function confirmRedemption(id: string, received: NonNullable<Redemption['received']>) {
    setRedemptions((list) => list.map((item) => (item.id === id ? { ...item, received } : item)))
  }

  // Member menukar poin; hadiah diambil di mitra, lalu mitra mengonfirmasi dengan foto.
  function redeem(reward: { name: string; cost: number }) {
    const next = Math.max(...redemptions.map((item) => Number(item.id.slice(4)))) + 1
    const id = `TKR-${String(next).padStart(6, '0')}`
    setRedemptions((list) => [
      { id, code: 'GP-00001', reward: reward.name, cost: reward.cost, at: new Date().toISOString() },
      ...list,
    ])
    setPoints((value) => value - reward.cost)
    setActivities((list) => [
      {
        id: `t${list.length}`,
        kind: 'tukar',
        ref: id,
        status: 'Berhasil',
        title: 'Poin berhasil ditukar',
        meta: `Baru saja · ${reward.name}`,
        amount: reward.name,
        points: `-${reward.cost} poin`,
        name: 'Demo Farmer',
        member: 'GP-00001',
      },
      ...list,
    ])
    return id
  }

  return (
    <div className="app-shell">
      {tab === 'home' && <Home
          setTab={setTab}
          points={points}
          account={account}
          photo={photo}
          role={role}
          redemptions={redemptions}
        />}
      {tab === 'gladisplash' && <GladiSplash onDone={() => setTab('gladipoint')} />}
      {tab === 'agrosplash' && <AgroSplash onDone={() => setTab('home')} />}
      {tab === 'gladipoint' && role === 'Mitra' && (
        <MitraGladi
          onBack={() => setTab('agrosplash')}
          account={account}
          setAccount={setAccount}
          photo={photo}
          setPhoto={setPhoto}
          role={role}
          setRole={setRole}
          redemptions={redemptions}
          onConfirmRedemption={confirmRedemption}
          productions={productions}
          setProductions={setProductions}
          pickups={pickups}
          setPickups={setPickups}
        />
      )}
      {tab === 'gladipoint' && role === 'Super Admin' && (
        <SuperAdminGladi
          onBack={() => setTab('agrosplash')}
          account={account}
          setAccount={setAccount}
          photo={photo}
          setPhoto={setPhoto}
          role={role}
          setRole={setRole}
          productions={productions}
          pickups={pickups}
        />
      )}
      {tab === 'gladipoint' && role !== 'Mitra' && role !== 'Super Admin' && <GladiPoint
          onBack={() => setTab('agrosplash')}
          points={points}
          activities={activities}
          redemptions={redemptions}
          productions={productions}
          pickups={pickups}
          onRedeem={redeem}
          account={account}
          setAccount={setAccount}
          photo={photo}
          setPhoto={setPhoto}
        />}
      {tab === 'konsultasi' && <Consultation onBack={() => setTab(consultFrom)} />}
      {tab === 'groovi' && <Groovi />}
      {tab === 'spring' && <Spring onBack={() => setTab('home')} onConsult={() => {
            setConsultFrom('spring')
            setTab('konsultasi')
          }}
        />}
      {tab === 'profile' && (
        <AccountPage
          role={role}
          setRole={(next) => {
            setRole(next)
            // Mitra langsung masuk ke GladiPoint sebagai halaman utama.
            if (next === 'Mitra') setTab('gladipoint')
            // Super Admin memulai dari beranda AgroFertile, lalu masuk GladiPoint lewat menu.
            if (next === 'Super Admin') setTab('home')
          }}
          account={account}
          setAccount={setAccount}
          photo={photo}
          setPhoto={setPhoto}
          title="Profil Saya"
          onBack={() => setTab('home')}
        />
      )}
      {tab !== 'gladisplash' && tab !== 'agrosplash' && tab !== 'gladipoint' && <BottomNav
          tab={tab}
          setTab={(next) => {
            if (next === 'konsultasi') setConsultFrom('home')
            setTab(next)
          }}
        />}
    </div>
  )
}
