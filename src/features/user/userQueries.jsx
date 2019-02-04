export const userDetailedQuery = ({userUid}) => {
	if(userUid !== null) {
		return [
			{
				collection: 'users',
				doc: userUid,
				storeAs: 'profile'
			}
		]
	}
}