import { useEffect, useRef, useState, type ReactNode } from 'react'
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

const roles = ['Petani', 'Agroman', 'Agronomis', 'Mitra', 'Admin'] as const
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
}: {
  role: AppRole
  setTab: (tab: Tab) => void
  points: number
  account: Account
  photo: string | null
}) {
  const [promo, setPromo] = useState<number | null>(null)
  const [banner, setBanner] = useState(0)

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

        <section className="quick-grid" aria-label="Akses cepat">
          <button onClick={() => setTab('gladisplash')}>
            <Icon name="trophy" size={30} />
            <span>GladiPoint</span>
            <span className="points-pill">{points} Poin</span>
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
  status: 'Terverifikasi' | 'Berhasil'
  title: string
  meta: string
  amount: string
  points: string
  name: string
  member: string
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
  return (
    <span className="status-pill">
      <Icon name="check" size={13} strokeWidth={2.4} />
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
  onRedeem,
  account,
  setAccount,
  photo,
  setPhoto,
}: {
  onBack: () => void
  points: number
  activities: Activity[]
  onRedeem: (reward: { name: string; cost: number }) => void
  account: Account
  setAccount: (account: Account) => void
  photo: string | null
  setPhoto: (photo: string | null) => void
}) {
  const [view, setView] = useState<GladiView>('home')
  const [redeeming, setRedeeming] = useState<Reward | null>(null)
  const [redeemed, setRedeemed] = useState<string | null>(null)
  const [detail, setDetail] = useState<Reward | null>(null)
  const [unread, setUnread] = useState(true)
  const [partnerDetail, setPartnerDetail] = useState(false)
  const [actTab, setActTab] = useState<'bso' | 'hadiah'>('bso')
  const [query, setQuery] = useState('')
  const [sheet, setSheet] = useState<'qr' | null>(null)
  const [qrVersion, setQrVersion] = useState(1)

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
    const inTab = activities.filter((item) => (actTab === 'bso' ? item.kind === 'setoran' : item.kind === 'tukar'))
    const shown = inTab.filter(
      (item) =>
        !q ||
        [item.ref, item.title, item.name, item.member, item.amount].some((field) =>
          field.toLowerCase().includes(q),
        ),
    )
    return (
      <main className="page gladi-page">
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
    )
  }

  if (view === 'hadiah') {
    return (
      <>
        <main className="page gladi-page">
          <Header title="Hadiah" subtitle={`Poin Anda ${points}`} onBack={() => setView('home')} />
          {redeemed && (
            <p className="gp-qr-done" role="status">
              Poin berhasil ditukar: {redeemed}. Cek di menu Aktivitas.
            </p>
          )}
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
        </main>
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
                  <Icon name="truck" size={20} /> Pengiriman
                </h3>
                <p>
                  Hadiah dikirim langsung dari pusat ke alamat korespondensi Anda. Anda tidak perlu memilih atau
                  datang ke lokasi mana pun — cukup ajukan.
                </p>
              </section>
              <section className="rw-info">
                <h3>Ketentuan</h3>
                <ul>
                  <li>
                    <Icon name="truck" size={20} />
                    <span>Dikirim ke alamat korespondensi Anda oleh admin program.</span>
                  </li>
                  <li>
                    <Icon name="info" size={20} />
                    <span>Pengajuan dapat dibatalkan selama belum dikirim; poin dikembalikan penuh.</span>
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
                      onRedeem(redeeming)
                      setRedeemed(redeeming.name)
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
      <main className="page gladi-page gp-home">
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
            <span>Level Benih</span>
          </div>
          <div className="gp-stock-items">
            <div>
              <span className="gp-stock-icon">
                <Icon name="sprout" size={20} />
              </span>
              <p>
                <strong>0 kg</strong>
                <small>Kompos siap diambil</small>
              </p>
            </div>
            <div>
              <span className="gp-stock-icon">
                <Icon name="drop" size={20} />
              </span>
              <p>
                <strong>0 L</strong>
                <small>Nutrisi Organik Cair siap diambil</small>
              </p>
            </div>
          </div>
          <div className="gp-bar" aria-hidden="true">
            <i />
          </div>
          <small>PKG Cabang Bojonegoro · 10 kg lagi ke Tunas</small>
        </section>

      </main>

      {sheet === 'qr' && (
        <QrSheet
          version={qrVersion}
          onRegenerate={() => setQrVersion((value) => value + 1)}
          onClose={() => setSheet(null)}
        />
      )}

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

type MitraTab = 'peringkat' | 'gladiator' | 'grafik' | 'ringkasan' | 'bso' | 'member' | 'produksi' | 'pengambilan' | 'lainnya'

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

function memberRanking(period: string) {
  const totals = new Map<string, number>()
  mitraDeposits
    .filter((item) => period === 'Semua bulan' || periodOf(item.date) === period)
    .forEach((item) => totals.set(item.code, (totals.get(item.code) ?? 0) + item.kg))
  return mitraMembers
    .map((member) => ({ member, kg: Math.round((totals.get(member.code) ?? 0) * 10) / 10 }))
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

function MitraRanking({ period, onPick }: { period: string; onPick: () => void }) {
  const [all, setAll] = useState(false)
  const rows = memberRanking(period)
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
        {rows.length === 0 && <p className="mt-hint">Belum ada setoran pada periode ini.</p>}
        {shown.map(({ member, kg }, index) => (
          <div key={member.code} className="mt-rank">
            <span className={`mt-rank-no n${index + 1 <= 3 ? index + 1 : 0}`}>{index + 1}</span>
            <span className="mt-member-info">
              <strong>{member.name}</strong>
              <small>{member.code}</small>
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

function MitraGladi({
  onBack,
  account,
  setAccount,
  photo,
  setPhoto,
  role,
  setRole,
}: {
  onBack: () => void
  account: Account
  setAccount: (account: Account) => void
  photo: string | null
  setPhoto: (photo: string | null) => void
  role: AppRole
  setRole: (role: AppRole) => void
}) {
  const [page, setPage] = useState<MitraTab>('ringkasan')
  const [akun, setAkun] = useState(false)
  const [period, setPeriod] = useState('Nov 2026')
  const [picker, setPicker] = useState(false)
  const [trendType, setTrendType] = useState<'batang' | 'garis'>('batang')
  const [pickYear, setPickYear] = useState(2026)
  const [productions, setProductions] = useState(seedProductions)
  const [pickups, setPickups] = useState(seedPickups)
  const [usage, setUsage] = useState(seedUsage)
  const gladiator = usageTotals(period, usage)
  const leader = memberRanking(period)[0]
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
              <div className="mt-hero-actions">
                <button
                  className="primary"
                  onClick={(event) => {
                    event.stopPropagation()
                    setPage('bso')
                  }}
                >
                  <Icon name="plus" size={16} strokeWidth={2.6} /> Catat BSO
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    setPage('grafik')
                  }}
                >
                  Detail operasional <Icon name="chevron" size={13} strokeWidth={2.4} />
                </button>
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
                  <strong className="clip">{leader ? `#1 ${leader.member.name}` : 'Belum ada data'}</strong>
                </p>
                <Icon name="chevron" size={16} />
              </button>
            </div>
          </>
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

      {picker && (
        <div className="modal-backdrop" onClick={() => setPicker(false)}>
          <section className="promo-sheet gp-sheet mt-picker" onClick={(event) => event.stopPropagation()}>
            <button className="sheet-handle" onClick={() => setPicker(false)} aria-label="Tutup" />
            <h2>Pilih periode</h2>
            <button
              className={`mt-all ${period === 'Semua bulan' ? 'active' : ''}`}
              onClick={() => {
                setPeriod('Semua bulan')
                setPicker(false)
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
                      setPicker(false)
                    }}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      )}

    </>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [points, setPoints] = useState(GLADI_POINTS)
  const [activities, setActivities] = useState(initialActivities)
  const [photo, setPhoto] = useState<string | null>(null)
  const [role, setRole] = useState<AppRole>('Petani')
  const [accounts, setAccounts] = useState<Partial<Record<AppRole, Account>>>({})
  // Tiap role punya akun sendiri; Mitra memakai nama khusus agar tidak membingungkan.
  const account = accounts[role] ?? (role === 'Mitra' ? { ...initialAccount, name: 'Mitra Bojonegoro Kanwil I', email: 'mitra.bojonegoro@agrifertile.com' } : initialAccount)
  const setAccount = (next: Account) => setAccounts((current) => ({ ...current, [role]: next }))
  const [consultFrom, setConsultFrom] = useState<Tab>('spring')

  function redeem(reward: { name: string; cost: number }) {
    setPoints((value) => value - reward.cost)
    setActivities((list) => [
      {
        id: `t${list.length}`,
        kind: 'tukar',
        ref: `TKR-${String(list.length).padStart(6, '0')}`,
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
  }

  return (
    <div className="app-shell">
      {tab === 'home' && <Home
          setTab={setTab}
          points={points}
          account={account}
          photo={photo}
          role={role}
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
        />
      )}
      {tab === 'gladipoint' && role !== 'Mitra' && <GladiPoint
          onBack={() => setTab('agrosplash')}
          points={points}
          activities={activities}
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
