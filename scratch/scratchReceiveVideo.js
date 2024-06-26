/* Copyright 2018 Streampunk Media Ltd.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const g = require('../index.js');

async function run() {
  let f = await g.find({});
  let l = f.sources();
  console.log('>>> FOUND >>>', l);
  let r = await g.receive({ source: l[0] });
  console.log('>>> RECEIVER >>>', r);
  for ( let x = 0 ; x < 10 ; x++ ) {
    let v = await r.video();
    console.log('>>> VIDEO >>>', v);
    console.log(process.memoryUsage());
    v = null;
  }
  l = null;
  r = null;
  v = null;
  console.log(process.memoryUsage());
  setTimeout(() => { global.gc();
    console.log("that's almost all folks", process.memoryUsage()); }, 1000);
  setTimeout(() => {   global.gc(); console.log("that's it", process.memoryUsage()); }, 2000);
  setTimeout(() => {   global.gc(); console.log("that's really it", process.memoryUsage()); }, 3000);
}

run();
