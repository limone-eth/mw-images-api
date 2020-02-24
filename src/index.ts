import {app} from './app'
import {AddressInfo} from 'net'

app.set('port', process.env.PORT || 5000);
app.set('hostname', process.env.HOSTNAME || '0.0.0.0');

const server = app.listen(app.get('port'), app.get('hostname'), () => {
    const {port, address} = server.address() as AddressInfo;
    console.log('\x1b[36m%s\x1b[0m %s', 'Express server listening on:', 'http://' + address + ':' + port + '/ with pid: ' + process.pid);
});

