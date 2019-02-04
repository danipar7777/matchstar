import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import PartidoList from '../PartidoList/PartidoList';
import { getPartidosForDashboard } from '../partidoActions';

const mapState = (state) => ({
	partidos: state.partidos,
	loading: state.async.loading,
});

const actions = {
	getPartidosForDashboard
}

class PartidoDashboard extends Component {

	constructor(props){
		super(props);

		this.state = {
			morePartidos: false,
			loadingInitial: true,
			loadedPartidos: [],
			contextRef: {}
		}
	}

	async componentDidMount() {
		let next = await this.props.getPartidosForDashboard();

		if(next && next.docs && next.docs.length > 1) {
			this.setState({
				morePartidos: true,
				loadingInitial: false
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.partidos !== nextProps.partidos) {
			this.setState({
				loadedPartidos: [...this.state.loadedPartidos, ...nextProps.partidos]
			})
		}
	}

	getNextPartidos = async () => {
		const {partidos} = this.props;
		let lastPartido = partidos && partidos[partidos.length -1];
		let next = await this.props.getPartidosForDashboard(lastPartido);
		if(next && next.docs && next.docs.length <= 1) {
			this.setState({
				morePartidos: false
			})
		}
	}

	handleContextRef = contextRef => this.setState({contextRef});

	render() {
		const {loading} = this.props;
		const {morePartidos, loadedPartidos} = this.state;
		return (
			<Grid>
				<Grid.Column width={10}>
					<div ref={this.handleContextRef}>
						<PartidoList loading={loading} morePartidos={morePartidos} partidos={loadedPartidos} getNextPartidos={this.getNextPartidos} />
					</div>
				</Grid.Column>
				<Grid.Column width={10}>
					<Loader active={loading} />
				</Grid.Column>
			</Grid>
		)
	}
}

export default connect(mapState, actions)(PartidoDashboard)
;