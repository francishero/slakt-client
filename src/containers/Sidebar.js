import React from 'react';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';
import { allTeamsQuery } from '../graphql/team'

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/addChannelModal'

class Sidebar extends React.Component {
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
      const { data: { loading, allTeams }, currentTeamId } = this.props
      if (loading) {
        return null;
      }
      /*
    is the currentTeam id from match.params.teamId good?
    find the index of the team where the id equals to the currentTeam id
    set the team on that index as the current logged in user active team
     */
      const teamIdx = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)]) : 0
      const team = allTeams[teamIdx];
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
          teams={allTeams.map(t => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase(),
                }))}
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




export default graphql(allTeamsQuery)(Sidebar);
