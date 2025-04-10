// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Transmit",
      "url": "backend.php",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "naming_colors_RD",
    "description": "色の名前を学ぶ\n研究開発版",
    "repository": "",
    "contributors": ""
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Sequence",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
// 児童ID
this.state.participantID = ""
// 児童ID入力チェックフラグ
this.state.pIDflg = "OK"

// GSからの読み込み/書き込み状況とエラーコード
this.state.gsreadflg = "NG"
this.state.gswriteflg = "NG"
this.state.gscode = ""

// 試行数（出題数）
this.state.trial_n = 10

// 比較刺激を格納しておく配列（n=5まで確保しておく）
this.state.compAry = ["","","","",""];

}
      },
      "title": "naming_colors",
      "plugins": [
        {
          "type": "fullscreen",
          "message": "フルスクリーンモード",
          "hint": "がめんを　たっち　してください",
          "path": "lab.plugins.Fullscreen"
        }
      ],
      "timeline": [],
      "content": [
        {
          "type": "lab.canvas.Screen",
          "content": [
            {
              "type": "i-text",
              "left": 0,
              "top": 0,
              "angle": 0,
              "width": 887.68,
              "height": 36.16,
              "stroke": null,
              "strokeWidth": 1,
              "fill": "black",
              "text": "サーバーからデータを読んでいます。しばらくお待ち下さい。",
              "fontStyle": "normal",
              "fontWeight": "normal",
              "fontSize": "18",
              "fontFamily": "sans-serif",
              "lineHeight": 1.16,
              "textAlign": "center"
            }
          ],
          "viewport": [
            800,
            600
          ],
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
// GoogleSpreadsheet の ワークシート「list」 からIDを読み込んで配列に格納する
// 「list」シートは1行目が列名の想定（今回だと「ID」）
// なので、「list」シートは現状1列のみですが、2列、3列と拡張可能な作りにしています
// エラーが生じたらreaderrorをTrueにする。正常ならFalse。 

// GET前のフラグ値セット
let readerror = true
this.state.ids = []

// パラメータに「sheetName」を設定する必要があります。
// 島宗の Googleスプレッドシート
const URL = "https://script.google.com/macros/s/AKfycbzB5rJBVlvi70P69KdzIavOrJByKMhafVUt4FrGIFi8eQeAZv35AXP0IsysqD30V_6h/exec?sheetName=list";
// さやか星小学校の Googleスプレッドシート
//const URL = "https://script.google.com/macros/s/AKfycbzaGQSdxdCI0pKNUwvj8Qu68dO3E7e_RDkdJjRTqVI-Z_C_j6bsFbpKd8cx7I39gdc1mg/exec?sheetName=list";

// GETする
const requestParams = {
  "method"     : "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

// 実際のデータ取得開始
fetch(URL, requestParams)
  .then((response) => {
    if (!response.ok)
      return new Promise((resolve) => resolve({ readerror: true }));

    return response.json();
  })
  .then((result) => {
    // ポスト後のフラグ値によって次の処理を分岐する
    // ここから先は私がコードを書きます。
    const readerror = result.readerror;

    if (readerror == true) {
      // TODO: implementation
      console.log("error");
      this.state.gsreadflg = "NG"
      this.state.gscode = result.readerror

    } else {
      // TODO: implementation
      console.log("OK!");
      // 取得した配列は列名で呼び出せる
      console.log(result.ID);
      this.state.ids = result.ID;
      this.state.gsreadflg = "OK"
      this.state.gscode = ""

      //ローディング画面を閉じる
      this.end();
    }
  })
  .catch((e) => console.log(e));
}
          },
          "title": "Reading from GS",
          "timeout": "10000"
        },
        {
          "type": "lab.html.Page",
          "items": [
            {
              "type": "text",
              "title": "せんせいに　みせて　ください",
              "content": "Googleスプレッドシートへのアクセスで問題が生じました。\u003Cbr\u003E\u003Cbr\u003E\nエラーコードは「${this.state.gscode} 」です。\u003Cbr\u003E\u003Cbr\u003E\nエラーコードをメモして管理者までお知らせください。\u003Cbr\u003E\u003Cbr\u003E\n\u003Cbr\u003E\u003Cbr\u003E\n申し訳ありませんが，このままブラウザーを閉じてください。"
            },
            {
              "required": true,
              "type": "html",
              "name": ""
            }
          ],
          "scrollTop": true,
          "submitButtonText": "Continue →",
          "submitButtonPosition": "hidden",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Check GS Error",
          "width": "l",
          "tardy": true,
          "skip": "${this.state.gsreadflg == \"OK\"}"
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "dummy": "1"
            },
            {
              "dummy": "2"
            },
            {
              "dummy": "3"
            },
            {
              "dummy": "4"
            },
            {
              "dummy": "5"
            }
          ],
          "sample": {
            "mode": "sequential",
            "n": "100"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "StudentID",
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "end": function anonymous(
) {
if (this.state.pIDflg == "OK") {
  this.parent.end()
}
}
            },
            "title": "Sequence",
            "tardy": true,
            "content": [
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": true,
                    "type": "input",
                    "label": "じぶんの　ばんごうを　いれてから　「O K」を　おしてね",
                    "name": "kid",
                    "attributes": {
                      "type": "text",
                      "min": "1000",
                      "max": "9000"
                    }
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "O K",
                "submitButtonPosition": "right",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
this.state.participantID = this.data.kid;

if (this.state.ids.includes(this.state.participantID)) {
  this.state.pIDflg = "OK";

  // 入力されたkidが問題ない場合、
  // localStorageに値を保存する。（ブラウザに値を保存するイメージ）
  // 次回、この画面がロードされた時にも、この値は保存され続けているので、
  // 値を呼び出してテキストボックスの入力欄に挿入する。
  localStorage.setItem('kid', this.state.participantID);
} else {
  this.state.pIDflg = "E";
  // エラーの場合はlocalStorageの値をクリアする
  localStorage.removeItem('kid');
}

},
                  "run": function anonymous(
) {
// 画面読み込み時にlocalStorageの値を参照し、値が存在していたら
// それをテキストボックスの値にセットする

const lastKid = localStorage.getItem('kid');
if (lastKid !== null) {
  const elem = document.getElementsByName("kid")[0];
  elem.value = lastKid;
}
}
                },
                "title": "InputID",
                "width": "l",
                "tardy": true
              },
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "type": "text",
                    "content": "${this.state.participantID} 　は　まちがいです。",
                    "title": "ばんごうが　まちがっているみたいです。"
                  },
                  {
                    "required": true,
                    "type": "text",
                    "content": "せんせいに　みてもらってください。"
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "Try Again",
                "submitButtonPosition": "right",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "WrongID",
                "width": "l",
                "tardy": true,
                "skip": "${state.pIDflg != \"E\"}"
              }
            ]
          }
        },
        {
          "type": "lab.html.Page",
          "items": [
            {
              "type": "text",
              "title": "いろいろな　いろ",
              "content": "いろの　なまえを　まなぼう"
            },
            {
              "required": true,
              "type": "text",
              "title": "",
              "content": ""
            },
            {
              "required": true,
              "type": "html",
              "content": "",
              "name": ""
            },
            {
              "required": true,
              "type": "text",
              "title": "ようい　できたら",
              "content": "「START」をおしてね"
            }
          ],
          "scrollTop": true,
          "submitButtonText": "START",
          "submitButtonPosition": "right",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Start",
          "width": "l"
        },
        {
          "type": "lab.flow.Sequence",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
//教材名
this.state.material = "いろのなまえ";

// 各種設定
// 矯正試行用のフラグ：誤反応ならtrueで同じ問題を繰り返す
this.state.trialcontinueflg = true;

//初発反応の正誤記録用カウンター
this.state.correctN = 0;
this.state.incorrectN = 0;

//正反応に対するフィードバック
this.state.crmark = "💮";
this.state.icmark = "";


//画面最下部に提示する「◯」表示用テキスト
this.state.maru = ["","","","","","","","","",""]
//◯の数を数えるカウンター
this.state.nofmaru = 0
//◯に表示するテキスト
this.state.mark = ["◯","◯","◯","◯","◯","◯","◯","◯","◯","★"]
//◯に表示するテキストの色
this.state.marucolor = ["#0070d9","#0070d9","#0070d9","#0070d9","#0070d9","#0070d9","#0070d9","#0070d9","#0070d9","#fcbb0a"]


//未使用
//this.state.prmpt_correctN = 0;
//this.state.prmpt_incorrectN = 0;

}
          },
          "title": "naming_colors",
          "plugins": [],
          "content": [
            {
              "type": "lab.flow.Loop",
              "templateParameters": [
                {
                  "no": "1",
                  "sample": "ももいろ",
                  "pict": "pict01.jpg",
                  "nofcomp": "3",
                  "comp1": "ももいろ",
                  "comp2": "ふかみどり",
                  "comp3": "ねずみいろ",
                  "comp4": "NA",
                  "correctAns": "ももいろ",
                  "correctCmp": 0
                },
                {
                  "no": "2",
                  "sample": "きみどり",
                  "pict": "pict02.jpg",
                  "nofcomp": "3",
                  "comp1": "ももいろ",
                  "comp2": "やまぶきいろ",
                  "comp3": "きみどり",
                  "comp4": "NA",
                  "correctAns": "きみどり",
                  "correctCmp": 2
                },
                {
                  "no": "3",
                  "sample": "ふかみどり",
                  "pict": "pict03.jpg",
                  "nofcomp": "3",
                  "comp1": "おうどいろ",
                  "comp2": "ももいろ",
                  "comp3": "ふかみどり",
                  "comp4": "NA",
                  "correctAns": "ふかみどり",
                  "correctCmp": 2
                },
                {
                  "no": "4",
                  "sample": "うすだいだい",
                  "pict": "pict04.jpg",
                  "nofcomp": "3",
                  "comp1": "ぐんじょういろ",
                  "comp2": "うすだいだい",
                  "comp3": "あかむらさき",
                  "comp4": "NA",
                  "correctAns": "うすだいだい",
                  "correctCmp": 1
                },
                {
                  "no": "5",
                  "sample": "ねずみいろ",
                  "pict": "pict05.jpg",
                  "nofcomp": "3",
                  "comp1": "ねずみいろ",
                  "comp2": "おうどいろ",
                  "comp3": "ふかみどり",
                  "comp4": "NA",
                  "correctAns": "ねずみいろ",
                  "correctCmp": 0
                },
                {
                  "no": "6",
                  "sample": "おうどいろ",
                  "pict": "pict06.jpg",
                  "nofcomp": "3",
                  "comp1": "あかむらさき",
                  "comp2": "ふかみどり",
                  "comp3": "おうどいろ",
                  "comp4": "NA",
                  "correctAns": "おうどいろ",
                  "correctCmp": 2
                },
                {
                  "no": "7",
                  "sample": "ぐんじょういろ",
                  "pict": "pict07.jpg",
                  "nofcomp": "3",
                  "comp1": "ももいろ",
                  "comp2": "ぐんじょういろ",
                  "comp3": "ふかみどり",
                  "comp4": "NA",
                  "correctAns": "ぐんじょういろ",
                  "correctCmp": 1
                },
                {
                  "no": "8",
                  "sample": "やまぶきいろ",
                  "pict": "pict08.jpg",
                  "nofcomp": "3",
                  "comp1": "うすだいだい",
                  "comp2": "ぐんじょういろ",
                  "comp3": "やまぶきいろ",
                  "comp4": "NA",
                  "correctAns": "やまぶきいろ",
                  "correctCmp": 2
                },
                {
                  "no": "9",
                  "sample": "あかむらさき",
                  "pict": "pict09.jpg",
                  "nofcomp": "3",
                  "comp1": "あかむらさき",
                  "comp2": "ふかみどり",
                  "comp3": "やまぶきいろ",
                  "comp4": "NA",
                  "correctAns": "あかむらさき",
                  "correctCmp": 0
                },
                {
                  "no": "10",
                  "sample": "あかちゃいろ",
                  "pict": "pict10.jpg",
                  "nofcomp": "3",
                  "comp1": "ぐんじょういろ",
                  "comp2": "ねずみいろ",
                  "comp3": "あかちゃいろ",
                  "comp4": "NA",
                  "correctAns": "あかちゃいろ",
                  "correctCmp": 2
                }
              ],
              "sample": {
                "mode": "draw-shuffle",
                "n": "${ this.state.trial_n }"
              },
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "Loop_Trials",
              "tardy": true,
              "plugins": [],
              "shuffleGroups": [],
              "template": {
                "type": "lab.flow.Loop",
                "templateParameters": [
                  {
                    "tr_rep": 1
                  },
                  {
                    "tr_rep": 2
                  },
                  {
                    "tr_rep": 3
                  },
                  {
                    "tr_rep": 4
                  },
                  {
                    "tr_rep": 5
                  },
                  {
                    "tr_rep": 6
                  },
                  {
                    "tr_rep": 7
                  },
                  {
                    "tr_rep": 8
                  },
                  {
                    "tr_rep": 9
                  },
                  {
                    "tr_rep": 10
                  }
                ],
                "sample": {
                  "mode": "sequential"
                },
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "Loop_Repeat_Trials",
                "shuffleGroups": [],
                "template": {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "end": function anonymous(
) {
// 正反応になったらその試行を終える：試行および矯正試行の終了条件
if (this.state.trialcontinueflg == false) {
  this.parent.end();
  // 試行終了フラグをリセットする
  this.state.trialcontinueflg = true;
}
}
                  },
                  "title": "Trial",
                  "content": [
                    {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "rect",
                          "left": 250,
                          "top": 50,
                          "angle": 0,
                          "width": 200,
                          "height": 80,
                          "stroke": "#000000",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "image",
                          "left": 0,
                          "top": -150,
                          "angle": 0,
                          "width": "150",
                          "height": "150",
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "black",
                          "src": "${ this.state.sample_pict}"
                        },
                        {
                          "type": "rect",
                          "left": -250,
                          "top": 50,
                          "angle": 0,
                          "width": 200,
                          "height": 80,
                          "stroke": "#000000",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "aoi",
                          "left": 250,
                          "top": 50,
                          "angle": 0,
                          "width": 194.33,
                          "height": 99.87,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "rgba(0, 0, 0, 0.2)",
                          "label": "right_p"
                        },
                        {
                          "type": "aoi",
                          "left": -250,
                          "top": 50,
                          "angle": 0,
                          "width": 194.99,
                          "height": 99.7,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "rgba(0, 0, 0, 0.2)",
                          "label": "left_p"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": 50,
                          "angle": 0,
                          "width": 207.02,
                          "height": 31.64,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.left }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "28",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 250,
                          "top": 50,
                          "angle": 0,
                          "width": 224.14,
                          "height": 31.64,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.right }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "28",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": -360,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -285,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -210,
                          "top": 261,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -135,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -60,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 15,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 90,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 165,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 240,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 338.89,
                          "top": 241.78,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "i-text",
                          "left": -360,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[0]}",
                          "text": "${this.state.maru[0]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -210,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[2]}",
                          "text": "${this.state.maru[2]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -285,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[1]}",
                          "text": "${this.state.maru[1]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -135,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[3]}",
                          "text": "${this.state.maru[3]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -60,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[4]}",
                          "text": "${this.state.maru[4]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 15,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[5]}",
                          "text": "${this.state.maru[5]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 90,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[6]}",
                          "text": "${this.state.maru[6]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": 0,
                          "top": 50,
                          "angle": 0,
                          "width": 200,
                          "height": 80,
                          "stroke": "#000000",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "i-text",
                          "left": 165,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[7]}",
                          "text": "${this.state.maru[7]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "aoi",
                          "left": 0,
                          "top": 50,
                          "angle": 0,
                          "width": 194.99,
                          "height": 99.7,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "rgba(0, 0, 0, 0.2)",
                          "label": "center_p"
                        },
                        {
                          "type": "i-text",
                          "left": 240,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[8]}",
                          "text": "${this.state.maru[8]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 338,
                          "top": 241,
                          "angle": 0,
                          "width": 533.64,
                          "height": 67.8,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[9]}",
                          "text": "${this.state.maru[9]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "60",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 0,
                          "top": 50,
                          "angle": 0,
                          "width": 247.49,
                          "height": 31.64,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.center }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "28",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pict01.jpg": "embedded\u002F57913c69c8b1a9dfdd68a8a2ef08dd6f311d4b5118e139159ce86fe795845a4e.jpg"
                      },
                      "responses": {
                        "click @left_p": "left",
                        "click @right_p": "right",
                        "click @center_p": "center"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "before:prepare": function anonymous(
) {
// 試行の正誤フラグを初期化
this.state.correct = false;

// 試行のパラメータ


// 見本刺激
this.state.sample_pict = "static/" + this.parameters.pict

// 比較刺激：*Loop_Trialsの後ろならどこでも設定できそうなものだがここでないとうまく動かない
this.state.compAry[0]= this.parameters.comp1;
this.state.compAry[1]= this.parameters.comp2;
this.state.compAry[2]= this.parameters.comp3;
this.state.compAry[3]= this.parameters.comp4;

// 比較刺激の位置を無作為化に使う配列（比較刺激の個数で使い分ける）
// 選択肢2
//c = [[0,1],[1,0]];
// 選択肢3
c = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];

// 選択肢のパターンの数：上の要素数
noc = 6
// 比較刺激の位置を無作為化する
r = Math.floor( Math.random() * noc );
p = c[r];
this.state.left = this.state.compAry[p[0]];
this.state.center = this.state.compAry[p[1]];
this.state.right = this.state.compAry[p[2]];

/*
// 正反応の位置を取得する：正反応となる比較刺激IDの位置（選択肢が2）
switch (p.indexOf(this.parameters.correctCmp)){
  case 0:
    this.parameters.ca = "left"
    break;
  case 1:
    this.parameters.ca = "right"
    break;
}
*/

// 正反応の位置を取得する：正反応となる比較刺激IDの位置（選択肢が3）

switch (p.indexOf(this.parameters.correctCmp)){
  case 0:
    this.parameters.ca = "left"
    break;
  case 1:
    this.parameters.ca = "center"
    break;
  case 2:
    this.parameters.ca = "right"
    break;
}


},
                        "after:end": function anonymous(
) {
if (this.state.correct == true) {
  //正反応数を数えて◯を表示する。最後の問題は★
  this.state.maru[this.state.nofmaru] = this.state.mark[this.state.nofmaru];
  this.state.nofmaru += 1;
  //初発反応の正誤のみを数えて記録する
  if (this.parameters.tr_rep == 1) {
    this.state.correctN += 1
  }
} else {
  //初発反応の正誤のみを数えて記録する
  if (this.parameters.tr_rep == 1) {
    this.state.incorrectN += 1;
  }
}
}
                      },
                      "title": "MTS",
                      "correctResponse": "${ this.parameters.ca }",
                      "tardy": true
                    },
                    {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "rect",
                          "left": 250,
                          "top": 50,
                          "angle": 0,
                          "width": 200,
                          "height": 80,
                          "stroke": "#000000",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "image",
                          "left": 0,
                          "top": -150,
                          "angle": 0,
                          "width": "150",
                          "height": "150",
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "black",
                          "src": "${ this.state.sample_pict}"
                        },
                        {
                          "type": "rect",
                          "left": -250,
                          "top": 50,
                          "angle": 0,
                          "width": 200,
                          "height": 80,
                          "stroke": "#000000",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "aoi",
                          "left": 250,
                          "top": 50,
                          "angle": 0,
                          "width": 194.33,
                          "height": 99.87,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "rgba(0, 0, 0, 0.2)",
                          "label": "right_p"
                        },
                        {
                          "type": "aoi",
                          "left": -250,
                          "top": 50,
                          "angle": 0,
                          "width": 194.99,
                          "height": 99.7,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "rgba(0, 0, 0, 0.2)",
                          "label": "left_p"
                        },
                        {
                          "type": "i-text",
                          "left": -250,
                          "top": 50,
                          "angle": 0,
                          "width": 207.02,
                          "height": 31.64,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.left }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "28",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 250,
                          "top": 50,
                          "angle": 0,
                          "width": 224.14,
                          "height": 31.64,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.right }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "28",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": -360,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -285,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -210,
                          "top": 261,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -135,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -60,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 15,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 90,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 165,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 240,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 338.89,
                          "top": 241.78,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "i-text",
                          "left": -360,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[0]}",
                          "text": "${this.state.maru[0]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -210,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[2]}",
                          "text": "${this.state.maru[2]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -285,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[1]}",
                          "text": "${this.state.maru[1]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -135,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[3]}",
                          "text": "${this.state.maru[3]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -60,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[4]}",
                          "text": "${this.state.maru[4]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 15,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[5]}",
                          "text": "${this.state.maru[5]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 90,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[6]}",
                          "text": "${this.state.maru[6]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 165,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[7]}",
                          "text": "${this.state.maru[7]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "rect",
                          "left": 0,
                          "top": 50,
                          "angle": 0,
                          "width": 200,
                          "height": 80,
                          "stroke": "#000000",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "aoi",
                          "left": 0,
                          "top": 50,
                          "angle": 0,
                          "width": 194.99,
                          "height": 99.7,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "rgba(0, 0, 0, 0.2)",
                          "label": "center_p"
                        },
                        {
                          "type": "i-text",
                          "left": 240,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[8]}",
                          "text": "${this.state.maru[8]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 338,
                          "top": 241,
                          "angle": 0,
                          "width": 533.64,
                          "height": 67.8,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[9]}",
                          "text": "${this.state.maru[9]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "60",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 0,
                          "top": 50,
                          "angle": 0,
                          "width": 247.49,
                          "height": 31.64,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.center }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "28",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 0,
                          "top": 165,
                          "angle": 0,
                          "width": 2027.38,
                          "height": 90.4,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.correct ? this.state.crmark: this.state.icmark }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "80",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pict01.jpg": "embedded\u002F57913c69c8b1a9dfdd68a8a2ef08dd6f311d4b5118e139159ce86fe795845a4e.jpg"
                      },
                      "responses": {},
                      "parameters": {},
                      "messageHandlers": {
                        "end": function anonymous(
) {
//正反応なら次の試行へ
if (this.state.correct) {
  console.log("correct");
  this.state.trialcontinueflg = false;
}

}
                      },
                      "title": "Feedback_Correct",
                      "tardy": true,
                      "timeline": [
                        {
                          "type": "sound",
                          "payload": {
                            "src": "static\u002Fs1.mp3",
                            "loop": false
                          },
                          "gain": "",
                          "pan": "",
                          "rampUp": "",
                          "rampDown": "",
                          "start": 0,
                          "stop": "700",
                          "priority": 0
                        }
                      ],
                      "timeout": "1000",
                      "skip": "${ this.state.correct == false }"
                    },
                    {
                      "type": "lab.canvas.Screen",
                      "content": [
                        {
                          "type": "image",
                          "left": 0,
                          "top": -200,
                          "angle": 0,
                          "width": 145.76,
                          "height": 152.15,
                          "stroke": null,
                          "strokeWidth": 0,
                          "fill": "black",
                          "src": "${ this.state.sample_pict}"
                        },
                        {
                          "type": "rect",
                          "left": 175,
                          "top": 50,
                          "angle": 0,
                          "width": 150,
                          "height": 80,
                          "stroke": "#000000",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -175,
                          "top": 50,
                          "angle": 0,
                          "width": 150,
                          "height": 80,
                          "stroke": "#000000",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "i-text",
                          "left": 0,
                          "top": -50,
                          "angle": 0,
                          "width": 608.64,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.parameters.sample }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -175,
                          "top": 50,
                          "angle": 0,
                          "width": 369.68,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.left }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 175,
                          "top": 50,
                          "angle": 0,
                          "width": 400.24,
                          "height": 56.5,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.right }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "50",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "aoi",
                          "left": -175,
                          "top": 50,
                          "angle": 0,
                          "width": 194.99,
                          "height": 99.7,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "rgba(0, 0, 0, 0.2)",
                          "label": "left_p"
                        },
                        {
                          "type": "aoi",
                          "left": 175,
                          "top": 50,
                          "angle": 0,
                          "width": 194.33,
                          "height": 99.87,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "rgba(0, 0, 0, 0.2)",
                          "label": "right_p"
                        },
                        {
                          "type": "rect",
                          "left": -360,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -285,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -210,
                          "top": 261,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -135,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": -60,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 15,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 90,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 165,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 240,
                          "top": 260,
                          "angle": 0,
                          "width": 60,
                          "height": 60,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "rect",
                          "left": 338.89,
                          "top": 241.78,
                          "angle": 0,
                          "width": 90,
                          "height": 90,
                          "stroke": "#dddddd",
                          "strokeWidth": 2,
                          "fill": "#ffffff"
                        },
                        {
                          "type": "i-text",
                          "left": -360,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${ this.state.marucolor[0] }",
                          "text": "${this.state.maru[0]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -210,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[2]}",
                          "text": "${this.state.maru[2]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -285,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[1]}",
                          "text": "${this.state.maru[1]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -135,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[3]}",
                          "text": "${this.state.maru[3]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": -60,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[4]}",
                          "text": "${this.state.maru[4]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 15,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[5]}",
                          "text": "${this.state.maru[5]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 90,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[6]}",
                          "text": "${this.state.maru[6]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 165,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[7]}",
                          "text": "${this.state.maru[7]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 240,
                          "top": 260,
                          "angle": 0,
                          "width": 355.76,
                          "height": 45.2,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[8]}",
                          "text": "${this.state.maru[8]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "40",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 338,
                          "top": 241,
                          "angle": 0,
                          "width": 533.64,
                          "height": 67.8,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "${this.state.marucolor[9]}",
                          "text": "${this.state.maru[9]}",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "60",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        },
                        {
                          "type": "i-text",
                          "left": 0,
                          "top": 150,
                          "angle": 0,
                          "width": 2027.38,
                          "height": 90.4,
                          "stroke": null,
                          "strokeWidth": 1,
                          "fill": "black",
                          "text": "${ this.state.correct ? this.state.crmark: this.state.icmark }",
                          "fontStyle": "normal",
                          "fontWeight": "normal",
                          "fontSize": "80",
                          "fontFamily": "sans-serif",
                          "lineHeight": 1.16,
                          "textAlign": "center"
                        }
                      ],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {
                        "pict01.jpg": "embedded\u002F57913c69c8b1a9dfdd68a8a2ef08dd6f311d4b5118e139159ce86fe795845a4e.jpg"
                      },
                      "responses": {},
                      "parameters": {},
                      "messageHandlers": {
                        "end": function anonymous(
) {
//正反応なら次の試行へ
if (this.state.correct) {
  console.log("correct");
  this.state.trialcontinueflg = false;
}

}
                      },
                      "title": "Feedback_Correct_back",
                      "tardy": true,
                      "timeline": [
                        {
                          "type": "sound",
                          "payload": {
                            "src": "static\u002Fs1.mp3",
                            "loop": false
                          },
                          "gain": "",
                          "pan": "",
                          "rampUp": "",
                          "rampDown": "",
                          "start": 0,
                          "stop": "700",
                          "priority": 0
                        }
                      ],
                      "timeout": "1000",
                      "skip": true
                    },
                    {
                      "type": "lab.canvas.Screen",
                      "content": [],
                      "viewport": [
                        800,
                        600
                      ],
                      "files": {},
                      "responses": {},
                      "parameters": {},
                      "messageHandlers": {
                        "end": function anonymous(
) {
console.log("incorrect");
}
                      },
                      "title": "Feedback_InCorrect_Blank",
                      "tardy": true,
                      "timeline": [],
                      "timeout": "1500",
                      "skip": "${ this.state.correct == true } "
                    }
                  ]
                }
              }
            },
            {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "Ending",
              "content": [
                {
                  "type": "lab.canvas.Screen",
                  "content": [
                    {
                      "type": "image",
                      "left": 0,
                      "top": 0,
                      "angle": 0,
                      "width": "800",
                      "height": "600",
                      "stroke": null,
                      "strokeWidth": 0,
                      "fill": "black",
                      "src": "${ this.files[\"congrats.jpg\"] }",
                      "autoScale": "height"
                    }
                  ],
                  "viewport": [
                    800,
                    600
                  ],
                  "files": {
                    "congrats.jpg": "embedded\u002Feb57710fe1e58477e9443ddf52e61186d74d8ca7f0defd856f9f5e6879ca5a31.jpg",
                    "clap.mp3": "embedded\u002F0b85daf0d19ebd2e28596829edc9b269e87b8d5dde43f779387bf429fd30dd39.mp3"
                  },
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "before:prepare": function anonymous(
) {
// 　現在の日付と時刻と YYYY-MM-DD HH:MM:SS で
const date = new Date();
date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
const str_date = date.toISOString().replace('T', ' ').substring(0,19);

// GoogleSpreadsheet の ワークシート「data」へデータをポストする。
// エラーが生じたらwriteerrorをTrueにする。正常ならFalse。

// SpreadSheetへデータを送信
// 島宗の Googleスプレッドシート
//const URL =
  "https://script.google.com/macros/s/AKfycbzB5rJBVlvi70P69KdzIavOrJByKMhafVUt4FrGIFi8eQeAZv35AXP0IsysqD30V_6h/exec";
/*
// さやか星小学校の Googleスプレッドシート
const URL =
  "https://script.google.com/macros/s/AKfycbzaGQSdxdCI0pKNUwvj8Qu68dO3E7e_RDkdJjRTqVI-Z_C_j6bsFbpKd8cx7I39gdc1mg/exec";
*/

const SendDATA = {
  // 島宗の Googleスプレッドシート
  key: "mW4QLDXg", // keyシートの内容
  // さやか星小学校の Googleスプレッドシート
  //key: "57ruZXfq", // keyシートの内容
  sheetName: "data", // 書き込むシート名
  columns: [  // 書き込む列とその値。複数行書き込む場合は配列で指定
    {
      "日付": str_date,
      "児童ID": this.state.participantID,
      "教材": this.state.material,
      "正反応数": this.state.correctN,
      "誤反応数": this.state.incorrectN
      //プロンプトで正反応数: this.state.prmpt_correctN,
      //プロンプトで誤反応数: this.state.prmpt_incorrectN
    },
  ],
};

const params = new URLSearchParams();
params.append("key", SendDATA.key);
params.append("sheetName", SendDATA.sheetName);
params.append("columns", JSON.stringify(SendDATA.columns));

const postparam = {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: params,
};

// 実際のPOST実行はここから
fetch(URL, postparam)
  .then((response) => {
    if (!response.ok)
      return new Promise((resolve) => resolve({ writeerror: true }));

    return response.json();
  })
  .then((result) => {
    // ポスト後のフラグ値によって次の処理を分岐する
    // ここから先は私がコードを書きます。
    const writeerror = result.writeerror;

    if (writeerror == true) {
      // TODO: implementation
      console.log("error");
      this.state.dataposterror = true
      this.state.gswriteflg = "NG"
      this.state.gscode = result.errorMessage

    } else {
      // TODO: implementation
      console.log("OK!");
      this.state.gswriteflg = "OK"
      this.state.gscode = ""

    }
  })
  .catch((e) => console.log(e));
  
}
                  },
                  "title": "Fanfare",
                  "timeline": [
                    {
                      "type": "sound",
                      "payload": {
                        "src": "${ this.files[\"clap.mp3\"] }",
                        "loop": false
                      },
                      "gain": "",
                      "pan": "",
                      "rampUp": "",
                      "rampDown": "",
                      "start": 0,
                      "stop": "3000",
                      "priority": 0
                    }
                  ],
                  "timeout": "5000",
                  "tardy": true
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "せんせいに　みせて　ください",
                      "content": "Googleスプレッドシートへのアクセスで問題が生じました。\u003Cbr\u003E\u003Cbr\u003E\nエラーコードは「${this.state.gscode} 」です。\u003Cbr\u003E\u003Cbr\u003E\nエラーコードをメモして管理者までお知らせください。\u003Cbr\u003E\u003Cbr\u003E\n\u003Cbr\u003E\u003Cbr\u003E\n申し訳ありませんが，このままブラウザーを閉じてください。"
                    },
                    {
                      "required": true,
                      "type": "html",
                      "name": ""
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "hidden",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {},
                  "title": "Check GS Error",
                  "width": "l",
                  "tardy": true,
                  "skip": true
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

// Let's go!
study.run()