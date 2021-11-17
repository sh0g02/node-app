class HitAndBlow {
  // answerSource: string[]
  // answer: string[]
  // tryCount: number
  //
  // constructor() {
  //   this.answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  //   this.answer = []
  //   this.tryCount = 0
  // }
  // class fields
  // 推論出来る型を書かない
  private readonly answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  private answer: string[] = []
  private tryCount = 0

  // 初期設定
  // 回答をランダムに作成
  setting() {
    const answerLength = 3
    while (this.answer.length < answerLength) {
      const randNum = Math.floor(Math.random() * this.answerSource.length)
      const selectedItem = this.answerSource[randNum]
      if (!this.answer.includes(selectedItem)) {
        this.answer.push(selectedItem)
      }
    }
  }

  async play() {
    // promptInputは非同期処理なので、async, await必要
    const inputArr = (await promptInput('「,」区切りで3つの数字を入力して下さい。')).split(',')
    const result = this.check(inputArr)
    if (result.hit !== this.answer.length) {
      // 不正解なら続ける
      printLine(`---\nHit: ${result.hit} \nBlow: ${result.blow}\n---`)
      this.tryCount += 1
      await this.play()
    } else {
      this.tryCount += 1
    }
  }

  end() {
    printLine(`正解です! \n試行回数: ${this.tryCount}`)
    process.exit()
  }

  private check(input: string[]) {
    let hitCount = 0
    let blowCount = 0

    input.forEach((val, index) => {
      if (val === this.answer[index]) {
        hitCount += 1
      } else if (this.answer.includes(val)) {
        blowCount += 1
      }
    })

    return {
      hit: hitCount,
      blow: blowCount,
    }
  }
}

interface HitAndBlowInterface {
  answerSource: string[]
  answer: string[]
  tryCount: number
}

const printLine = (text: string, breakLine: boolean = true) => {
  process.stdout.write(text + (breakLine ? '\n' : ''))
}

const promptInput = async (text: string) => {
  printLine(`\n${text}\n>`, false)
  const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))
  return input.trim()
}

// main関数
(async () => {
  // const name = await promptInput('名前を入力して下さい。')
  // console.log(name)
  // const age = await promptInput('年齢を入力して下さい。')
  // console.log(age)
  // process.exit()
  const hitAndBlow = new HitAndBlow()
  hitAndBlow.setting()
  await hitAndBlow.play()
  hitAndBlow.end()
})()
