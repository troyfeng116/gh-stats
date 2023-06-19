import { spawn } from 'child_process'

interface GIT_SPAWN_Response {
    stdout: string
    stderr: string
    exitCode: number | null
}

export const spawnCommandAndAwait = async (cmd: string, args?: string[]): Promise<GIT_SPAWN_Response> => {
    const TIMEOUT = 3 * 1000
    const childProcess = spawn(cmd, args, {
        timeout: TIMEOUT,
    })

    const { pid } = childProcess
    const timeout = setTimeout(() => {
        console.log('Timeout')
        try {
            if (pid !== undefined) {
                process.kill(-pid, 'SIGKILL')
            }
        } catch (e) {
            console.log('Cannot kill process')
        }
    }, TIMEOUT)

    let stdout = '',
        stderr = ''
    let exitCodeRes: number | null = 0
    childProcess.on('error', (err) => {
        stderr += err
        // console.log('Error:', err)
    })

    childProcess.stdout.on('data', (data) => {
        stdout += data.toString()
        // console.log(data.toString())
    })

    childProcess.on('exit', (exitCode: number | null) => {
        console.log('Stopped')
        exitCodeRes = exitCode
        clearTimeout(timeout)
    })

    await new Promise((r) => setTimeout(r, TIMEOUT))

    // childProcess.on('close', (exitCode: number | null) => {
    //     console.log(`cmd ${cmd} completed with code ${exitCode}`)
    // })

    // // const exitCode: number | null = await new Promise((resolve) => {
    // //     childProcess.on('close', (exitCode: number | null) => {
    // //         console.log(`cmd ${cmd} completed`)
    // //         resolve(exitCode)
    // //     })
    // // })

    // let stdout = ''
    // for await (const chunk of childProcess.stdout) {
    //     // console.log(`stdout chunk: ${chunk}`)
    //     stdout += chunk
    // }

    // let stderr = ''
    // for await (const chunk of childProcess.stderr) {
    //     // console.error(`stderr chunk: ${chunk}`)
    //     stderr += chunk
    // }

    return {
        stdout: stdout,
        stderr: stderr,
        exitCode: exitCodeRes,
    }
}

export const test = async (accessToken: string, owner: string, repo: string): Promise<void> => {
    const { stdout: o1, stderr: e1, exitCode: c1 } = await spawnCommandAndAwait('ls', ['-la'])
    console.log(o1, e1, c1)

    const localName = `${owner}-${repo}-${Date.now()}`
    const {
        stdout: o2,
        stderr: e2,
        exitCode: c2,
    } = await spawnCommandAndAwait('git', ['clone', `https://github.com/${owner}/${repo}`, `${localName}`])
    console.log(o2, e2, c2)

    const { stdout: o3, stderr: e3, exitCode: c3 } = await spawnCommandAndAwait('ls', ['-la', localName])
    console.log(o3, e3, c3)

    const { stdout: o4, stderr: e4, exitCode: c4 } = await spawnCommandAndAwait('rm', ['-rf', localName])
    console.log(o4, e4, c4)
}
