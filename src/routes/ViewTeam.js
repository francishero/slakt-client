import React from 'react';

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';

// match is passed in by react-router
// to inspect match use react dev tools and search for ViewTeam

const ViewTeam = ({ match: { params } }) => (
  <AppLayout>
    <Sidebar currentTeamId={params.teamId} />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);

export default ViewTeam
