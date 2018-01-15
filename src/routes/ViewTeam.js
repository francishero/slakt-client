import React from 'react';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom'

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import { allTeamsQuery } from '../graphql/team';

const ViewTeam = ({ data: { loading, allTeams }, match: { params: { teamId, channelId } } }) => {
    if (loading) {
        return null;
    }
    // the 'channels is undefined bug'
    if (!allTeams.length) {
        return <Redirect to="/create-team" />
    }

    // handle when teamId is not integer
    const teamIdInteger = parseInt(teamId, 10)
    const teamIdx = teamIdInteger ? findIndex(allTeams, ['id', teamIdInteger]) : 0;
    const team = allTeams[teamIdx];
    // handle when channelId is not integer
    const channelIdInteger = parseInt(channelId, 10)
    const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0;
    const channel = team.channels[channelIdx];

    return (
        <AppLayout>
            <Sidebar
              teams={allTeams.map(t => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase(),
                }))}
              team={team}
            />
            { channel && <Header channelName={channel.name} />}
            {channel && <Messages channelId={channel.id}>
                <ul className="message-list">
                    <li />
                    <li />
                </ul>
            </Messages>
            }
            {channel && <SendMessage channelName={channel.name} />}
        </AppLayout>
    );
};
/*
In this component we do all the graphql stuff and just pass the data
to the Sidebar, Header and Messages
this is so we can do all computations in this one Component and not
have to query the data in all components
 */
export default graphql(allTeamsQuery)(ViewTeam);
