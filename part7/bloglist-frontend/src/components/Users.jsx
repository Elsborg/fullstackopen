import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TableContainer = styled.div`
  width: 100%;
  font-family: 'sans-serif';
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`

const Td = styled.td`
  padding: 10px;
`

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Users</Th>
            <Th>Blogs Created</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Link to={user.id}>{user.name}</Link>
              </Td>
              <Td>{user.blogs.length}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default Users
