// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getProfiles, getUserStatuses} from 'mattermost-redux/selectors/entities/users';
import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {Action, ActionResult} from 'mattermost-redux/types/actions';

import {GlobalState} from 'types/store';

import CreateUserGroupsModal from './create_user_groups_modal';
import {GroupCreateWithUserIds} from 'mattermost-redux/types/groups';
import {createGroupWithUserIds} from 'mattermost-redux/actions/groups';
import {ModalData} from 'types/actions';
import {openModal} from 'actions/views/modals';

function makeMapStateToProps() {
    return (state: GlobalState) => {
        const profiles = getProfiles(state, {active: true});

        const userStatuses = getUserStatuses(state);

        return {
            profiles,
            userStatuses,
        };
    };
}

type Actions = {
    createGroupWithUserIds :(group: GroupCreateWithUserIds) => Promise<ActionResult>;
    openModal: <P>(modalData: ModalData<P>) => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            createGroupWithUserIds,
            openModal,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(CreateUserGroupsModal);
