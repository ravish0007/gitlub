const util = require('util')
const exec = util.promisify(require('child_process').exec)

const path = require('path')

async function setupUser (user) {
  await exec(`adduser --disabled-password --gecos "" ${user.name}`)
  await exec(`su -c 'cd && mkdir .ssh && chmod 700 .ssh' ${user.name}`)
  await exec(
    `su -c 'cd && touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys' ${user.name}`
  )

  const keyPrefix =
    'no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty '

  await exec(
    `su -c 'cd && echo ${
      keyPrefix + process.env.AGENT_PUB_KEY
    } >> .ssh/authorized_keys' ${user.name}`
  )
  await exec(
    `su -c 'cd && echo ${keyPrefix + user.sshKey} >> .ssh/authorized_keys' ${
      user.name
    }`
  )

  await exec(
    `cp -r ${path.join(process.cwd(), 'git-shell-commands')} /home/${user.name}`
  )

  //  change permission of git shell commands
  await exec(
    `chown -R ${user.name}:${user.name} /home/${user.name}/git-shell-commands `
  )
  await exec(
    `su -c 'chmod +x /home/${user.name}/git-shell-commands/*' ${user.name}`
  )

  //  change shell to git-shell
  await exec(`chsh ${user.name} -s $(which git-shell)`)
}

module.exports = setupUser
