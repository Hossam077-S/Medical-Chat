import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {

    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-bane" />
            <p>Add Members</p>
        </div>
    )
}

const EditChannel = ({ setIsEditing }) => {
    const { channel } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUser, setSelectedUser] = useState([]);

    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChange = channelName !== (channel.data.name || channel.data.id);

        if(nameChange) {
            await channel.update({ name: channelName }, { text: `Channel name chanfed to ${channelName}`});
        }

        if(selectedUser.length) {
            await channel.addMembers(selectedUser);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUser([]);
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUser={setSelectedUser} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default EditChannel
