import * as postActions from '../actions/posts';
import * as cityActions from '../actions/cities';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import App from '../components/App'




const mapStateToProps = (props) => ({
   ...props
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(cityActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)