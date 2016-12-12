import React, {Component} from 'react'
import {Link} from 'react-router'
import styled from 'styled-components'

const Container = styled.header`
  width: 100%;
  padding: 0 1rem;
  border-bottom: 1px solid #eee;
  line-height: 3rem;
`
const H1 = styled.h1`
  font-size: 1rem;
  margin: 0;
`
const LinkStyled = styled(Link)`
  color: inherit;
  text-decoration: none;
`

export default class Header extends Component {
  render () {
    return (
      <Container>
        <H1><LinkStyled to="/">lighten-ui!</LinkStyled></H1>
      </Container>
    )
  }
}
