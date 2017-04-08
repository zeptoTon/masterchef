const args = ['build'];
const opts = { stdio: 'inherit', cwd: 'masterchef-client', shell: true };
require('child_process').spawn('npm', args, opts);
