import React from 'react';
import { Users as UsersModel } from '../../interfaces/models/Users';
import { Users } from '../../scripts/APIs/Users';
import UsersRow from './UserRow';

interface SearchUsersProps {
    onChange: Function;
}

interface SearchUsersState {
    value: string;
    autocomplete: UsersModel[];
}

class SearchUsers extends React.Component<SearchUsersProps, SearchUsersState,{}> {
    constructor(props: SearchUsersProps) {
        super(props);
        this.state = {
            value: '',
            autocomplete: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event: React.ChangeEvent<any>) {
        this.setState({value: event.target.value});
        if (event.target.value.length === 0) {
            this.setState({
                autocomplete: []
            });
            return;
        }
        const response = await Users.get(null, event.target.value);
        if(response.status !== 200) {
            return;
        }
		this.setState({
			autocomplete: response.data
		});
    }

    userFound = async (user: UsersModel) => {
		this.setState({value: "", autocomplete: []});
        this.props.onChange(user);
	}

    render() { 
        return (
            <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input
                    type='text'
                    placeholder="Search People by Email or Name"
                    className="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700"
                    onChange={this.handleChange}
                    autoComplete="nope"
                />
                <div className="autocomplete-items absolute z-40 top-full left-0 right-0 bg-white">
                    {this.state.autocomplete?.map((user)=> {
                        return <UsersRow onClick={this.userFound} user={user} key={user.id} />;
                    })}
                </div>
            </div>
        );
    }
}

export default SearchUsers;
