import React from 'react';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';
import { allTeamsQuery } from '../graphql/team'

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/addChannelModal'

export default class Sidebar extends React.Component {
    state= {
      openAddChannelModal: false,
    }
    handleAddChannelClick= () => {
       this.setState({
           openAddChannelModal: true,
       })
    }
    handleCloseChannel= () => {
        this.setState({
            openAddChannelModal: false,
        })
    }
    render() {
      const { teams, team } = this.props
      let username = '';
      try {
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        // eslint-disable-next-line prefer-destructuring
        username = user.username;
      } catch (err) {}

      return [
        <Teams
          key="team-sidebar"
          teams={teams}
        />,
        <Channels
          key="channels-sidebar"
          teamName={team.name}
          teamId={team.id}
          username={username}
          channels={team.channels}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
          onAddChannelClick={this.handleAddChannelClick}
        />,
        <AddChannelModal
          onClose={this.handleCloseChannel}
          // pass in the team id we parsed
          teamId={team.id}
          open={this.state.openAddChannelModal}
          key="sidebar-add-channel-modal"
        />,
      ];
    }
}





