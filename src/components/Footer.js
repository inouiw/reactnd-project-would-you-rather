import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  footer: {
    'align-self': 'flex-end',
    margin: 10,
    width: '100%',
  },
})

class Footer extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.footer}>
        Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">
        CC 3.0 BY</a>
    </div>
    )
  }
}

export default withStyles(styles)(Footer)