const users = []

const tambahPengguna = ({ id, username, room }) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  if (!username || !room)
    return { error: 'Username dan room dibutuhkan!' }

  const existingUser = users.find(
    (user) => user.room === room && user.username === username
  )

  if (existingUser)
    return { error: 'Username sudah digunakan!' }

  const user = { id, username, room }
  users.push(user)
  return { user }
}

const hapusPengguna = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1)
    return users.splice(index, 1)[0]
}

const ambilPengguna = (id) => users.find((user) => user.id === id)

const ambilPenggunaDariRoom = (room) => {
  room = room.trim().toLowerCase()
  return users.filter((user) => user.room === room)
}

module.exports = { tambahPengguna, hapusPengguna, ambilPengguna, ambilPenggunaDariRoom }
