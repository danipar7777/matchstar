import React, { Component } from 'react';
import PartidoListItem from './PartidoListItem';
import InfiniteScroll from 'react-infinite-scroller';

class PartidoList extends Component {
	render() {
		const {partidos, getNextPartidos, loading, morePartidos} = this.props;
		return (
			<div>
				{partidos && partidos.length !== 0 && (
					<InfiniteScroll pageStart={0} loadMore={getNextPartidos} hasMore={!loading && morePartidos} initialLoad={false}>
						{partidos && partidos.map((partido) => (
							<PartidoListItem key={partido.id} partido={partido} />
						))}
					</InfiniteScroll>
				)}
			</div>
		)
	}
}

export default PartidoList;