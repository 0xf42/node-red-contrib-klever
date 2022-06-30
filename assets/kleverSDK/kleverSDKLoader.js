"use strict";
if ("undefined" != typeof window)
  t(),
    (async function () {
      const t = new Go();
      let s;
      if ((delete WebAssembly.instantiateStreaming, globalThis.kleverSDKPath))
        s = await fetch(globalThis.kleverSDKPath);
      else if (
        (e("kleverSDK") ||
          (document.cookie = "kleverSDK=kleverSDK/kleverSDK.wasm"),
        (s = await fetch(e("kleverSDK"))),
        404 === s.status ||
          "application/wasm" !== s.headers.get("Content-Type"))
      ) {
        const e = [
          /*
          "assets/kleverSDK/kleverSDK.wasm",
          "kleverSDK.wasm",
          "assets/kleverSDK.wasm",
          "public/kleverSDK/kleverSDK.wasm",
          "static/kleverSDK/kleverSDK.wasm",
          "public/kleverSDK.wasm",
          "static/kleverSDK.wasm",
          "src/kleverSDK/kleverSDK.wasm",
          "src/kleverSDK.wasm",
          "kleverSDK/kleverSDK.wasm",
          */
          "xxx.wasm"
        ];
        for (let t = 0; t < e.length; t++)
          if (
            ((s = await fetch(e[t])),
            s.ok && "application/wasm" === s.headers.get("Content-Type"))
          ) {
            document.cookie = `kleverSDK=${e[t]}`;
            break;
          }
      }
      if (!s.ok)
        throw (
          (console.log(
            `Could not load KleverSDK ${s.status}: ${s.statusText}\n consider setting right path at globalThis.kleverSDKPath`
          ),
          `Could not load KleverSDK ${s.status}: ${s.statusText}\n consider setting right path at globalThis.kleverSDKPath`)
        );
      if ("application/wasm" !== s.headers.get("Content-Type"))
        throw (
          (console.log(
            `Could not load KleverSDK, expected "application/wasm" type got ${s.headers.get(
              "Content-Type"
            )}`
          ),
          `Could not load KleverSDK, expected "application/wasm" type got ${s.headers.get(
            "Content-Type"
          )}`)
        );
      const i = await s.arrayBuffer();
      if (!i) throw "Could parse arrayBuffer";
      const n = await WebAssembly.compile(i);
      (async function () {
        const e = await WebAssembly.instantiate(n, t.importObject);
        t.run(e);
      })(),
        (window.onload = async function () {
          const e = await WebAssembly.instantiate(n, t.importObject);
          t.run(e);
        });
    })();
else {
  if ("undefined" == typeof global)
    throw new Error("cannot export Go (neither global, window is defined)");
  t(),
    (async function () {
      const e = require("fs"),
        t = new Go();
      let s;
      if (globalThis.kleverSDKPath)
        e.existsSync(globalThis.kleverSDKPath) &&
          (s = e.readFileSync(globalThis.kleverSDKPath));
      else {
        const path = require("path"); // NEW: path is needed
        const t = [
          "kleverSDK/kleverSDK.wasm",
          "kleverSDK.wasm",
          "src/kleverSDK.wasm",
          "src/kleverSDK/kleverSDK.wasm",
          "assets/kleverSDK/kleverSDK.wasm",
          "assets/kleverSDK.wasm",
          "public/kleverSDK/kleverSDK.wasm",
          "static/kleverSDK/kleverSDK.wasm",
          "public/kleverSDK.wasm",
          "static/kleverSDK.wasm",
          path.resolve(__dirname, "./kleverSDK.wasm")   // NEW: usually we find the wasm in the same directory as the loader
        ];
        for (let i = 0; i < t.length; i++)
          if (e.existsSync(t[i])) {
            s = e.readFileSync(t[i]);
            break;
          }
      }
      if (!s)
        throw (
          (console.log(
            "Could not find KleverSDK wasm file, consider setting the right path at globalThis.kleverSDKPath"
          ),
          "Could not find KleverSDK wasm file, consider setting the right path at globalThis.kleverSDKPath")
        );
      const i = await WebAssembly.compile(new Uint8Array(s)),
        n = await WebAssembly.instantiate(i, t.importObject);
      t.run(n);
    })();
}
function e(e) {
  let t = e + "=",
    s = decodeURIComponent(document.cookie).split(";");
  for (let e = 0; e < s.length; e++) {
    let i = s[e];
    for (; " " == i.charAt(0); ) i = i.substring(1);
    if (0 == i.indexOf(t)) return i.substring(t.length, i.length);
  }
  return "";
}
function t() {
  (() => {
    if ("undefined" != typeof global);
    else if ("undefined" != typeof window) window.global = window;
    else {
      if ("undefined" == typeof self)
        throw new Error(
          "cannot export Go (neither global, window nor self is defined)"
        );
      self.global = self;
    }
    if (
      (global.require ||
        "undefined" == typeof require ||
        (global.require = require),
      !global.fs && global.require)
    ) {
      const e = require("fs");
      "object" == typeof e &&
        null !== e &&
        0 !== Object.keys(e).length &&
        (global.fs = e);
    }
    const e = () => {
      const e = new Error("not implemented");
      return (e.code = "ENOSYS"), e;
    };
    if (!global.fs) {
      let t = "";
      global.fs = {
        constants: {
          O_WRONLY: -1,
          O_RDWR: -1,
          O_CREAT: -1,
          O_TRUNC: -1,
          O_APPEND: -1,
          O_EXCL: -1,
        },
        writeSync(e, i) {
          t += s.decode(i);
          const n = t.lastIndexOf("\n");
          return (
            -1 != n && (console.log(t.substr(0, n)), (t = t.substr(n + 1))),
            i.length
          );
        },
        write(t, s, i, n, o, l) {
          if (0 !== i || n !== s.length || null !== o) return void l(e());
          l(null, this.writeSync(t, s));
        },
        chmod(t, s, i) {
          i(e());
        },
        chown(t, s, i, n) {
          n(e());
        },
        close(t, s) {
          s(e());
        },
        fchmod(t, s, i) {
          i(e());
        },
        fchown(t, s, i, n) {
          n(e());
        },
        fstat(t, s) {
          s(e());
        },
        fsync(e, t) {
          t(null);
        },
        ftruncate(t, s, i) {
          i(e());
        },
        lchown(t, s, i, n) {
          n(e());
        },
        link(t, s, i) {
          i(e());
        },
        lstat(t, s) {
          s(e());
        },
        mkdir(t, s, i) {
          i(e());
        },
        open(t, s, i, n) {
          n(e());
        },
        read(t, s, i, n, o, l) {
          l(e());
        },
        readdir(t, s) {
          s(e());
        },
        readlink(t, s) {
          s(e());
        },
        rename(t, s, i) {
          i(e());
        },
        rmdir(t, s) {
          s(e());
        },
        stat(t, s) {
          s(e());
        },
        symlink(t, s, i) {
          i(e());
        },
        truncate(t, s, i) {
          i(e());
        },
        unlink(t, s) {
          s(e());
        },
        utimes(t, s, i, n) {
          n(e());
        },
      };
    }
    if (
      (global.process ||
        (global.process = {
          getuid: () => -1,
          getgid: () => -1,
          geteuid: () => -1,
          getegid: () => -1,
          getgroups() {
            throw e();
          },
          pid: -1,
          ppid: -1,
          umask() {
            throw e();
          },
          cwd() {
            throw e();
          },
          chdir() {
            throw e();
          },
        }),
      !global.crypto && global.require)
    ) {
      const e = require("crypto");
      global.crypto = {
        getRandomValues(t) {
          e.randomFillSync(t);
        },
      };
    }
    if (!global.crypto)
      throw new Error(
        "global.crypto is not available, polyfill required (getRandomValues only)"
      );
    if (
      (global.performance ||
        (global.performance = {
          now() {
            const [e, t] = process.hrtime();
            return 1e3 * e + t / 1e6;
          },
        }),
      !global.TextEncoder &&
        global.require &&
        (global.TextEncoder = require("util").TextEncoder),
      !global.TextEncoder)
    )
      throw new Error("global.TextEncoder is not available, polyfill required");
    if (
      (!global.TextDecoder &&
        global.require &&
        (global.TextDecoder = require("util").TextDecoder),
      !global.TextDecoder)
    )
      throw new Error("global.TextDecoder is not available, polyfill required");
    const t = new TextEncoder("utf-8"),
      s = new TextDecoder("utf-8");
    if (
      ((global.Go = class {
        constructor() {
          (this.argv = ["js"]),
            (this.env = {}),
            (this.exit = (e) => {
              0 !== e && console.warn("exit code:", e);
            }),
            (this._exitPromise = new Promise((e) => {
              this._resolveExitPromise = e;
            })),
            (this._pendingEvent = null),
            (this._scheduledTimeouts = new Map()),
            (this._nextCallbackTimeoutID = 1);
          const e = (e, t) => {
              this.mem.setUint32(e + 0, t, !0),
                this.mem.setUint32(e + 4, Math.floor(t / 4294967296), !0);
            },
            i = (e) =>
              this.mem.getUint32(e + 0, !0) +
              4294967296 * this.mem.getInt32(e + 4, !0),
            n = (e) => {
              const t = this.mem.getFloat64(e, !0);
              if (0 === t) return;
              if (!isNaN(t)) return t;
              const s = this.mem.getUint32(e, !0);
              return this._values[s];
            },
            o = (e, t) => {
              const s = 2146959360;
              if ("number" == typeof t && 0 !== t)
                return isNaN(t)
                  ? (this.mem.setUint32(e + 4, s, !0),
                    void this.mem.setUint32(e, 0, !0))
                  : void this.mem.setFloat64(e, t, !0);
              if (void 0 === t) return void this.mem.setFloat64(e, 0, !0);
              let i = this._ids.get(t);
              void 0 === i &&
                ((i = this._idPool.pop()),
                void 0 === i && (i = this._values.length),
                (this._values[i] = t),
                (this._goRefCounts[i] = 0),
                this._ids.set(t, i)),
                this._goRefCounts[i]++;
              let n = 0;
              switch (typeof t) {
                case "object":
                  null !== t && (n = 1);
                  break;
                case "string":
                  n = 2;
                  break;
                case "symbol":
                  n = 3;
                  break;
                case "function":
                  n = 4;
              }
              this.mem.setUint32(e + 4, s | n, !0),
                this.mem.setUint32(e, i, !0);
            },
            l = (e) => {
              const t = i(e + 0),
                s = i(e + 8);
              return new Uint8Array(this._inst.exports.mem.buffer, t, s);
            },
            r = (e) => {
              const t = i(e + 0),
                s = i(e + 8),
                o = new Array(s);
              for (let e = 0; e < s; e++) o[e] = n(t + 8 * e);
              return o;
            },
            a = (e) => {
              const t = i(e + 0),
                n = i(e + 8);
              return s.decode(
                new DataView(this._inst.exports.mem.buffer, t, n)
              );
            },
            c = Date.now() - performance.now();
          this.importObject = {
            go: {
              "runtime.wasmExit": (e) => {
                e >>>= 0;
                const t = this.mem.getInt32(e + 8, !0);
                (this.exited = !0),
                  delete this._inst,
                  delete this._values,
                  delete this._goRefCounts,
                  delete this._ids,
                  delete this._idPool,
                  this.exit(t);
              },
              "runtime.wasmWrite": (e) => {
                const t = i((e >>>= 0) + 8),
                  s = i(e + 16),
                  n = this.mem.getInt32(e + 24, !0);
                fs.writeSync(
                  t,
                  new Uint8Array(this._inst.exports.mem.buffer, s, n)
                );
              },
              "runtime.resetMemoryDataView": (e) => {
                this.mem = new DataView(this._inst.exports.mem.buffer);
              },
              "runtime.nanotime1": (t) => {
                e((t >>>= 0) + 8, 1e6 * (c + performance.now()));
              },
              "runtime.walltime": (t) => {
                t >>>= 0;
                const s = new Date().getTime();
                e(t + 8, s / 1e3),
                  this.mem.setInt32(t + 16, (s % 1e3) * 1e6, !0);
              },
              "runtime.scheduleTimeoutEvent": (e) => {
                e >>>= 0;
                const t = this._nextCallbackTimeoutID;
                this._nextCallbackTimeoutID++,
                  this._scheduledTimeouts.set(
                    t,
                    setTimeout(() => {
                      for (this._resume(); this._scheduledTimeouts.has(t); )
                        console.warn(
                          "scheduleTimeoutEvent: missed timeout event"
                        ),
                          this._resume();
                    }, i(e + 8) + 1)
                  ),
                  this.mem.setInt32(e + 16, t, !0);
              },
              "runtime.clearTimeoutEvent": (e) => {
                e >>>= 0;
                const t = this.mem.getInt32(e + 8, !0);
                clearTimeout(this._scheduledTimeouts.get(t)),
                  this._scheduledTimeouts.delete(t);
              },
              "runtime.getRandomData": (e) => {
                (e >>>= 0), crypto.getRandomValues(l(e + 8));
              },
              "syscall/js.finalizeRef": (e) => {
                e >>>= 0;
                const t = this.mem.getUint32(e + 8, !0);
                if ((this._goRefCounts[t]--, 0 === this._goRefCounts[t])) {
                  const e = this._values[t];
                  (this._values[t] = null),
                    this._ids.delete(e),
                    this._idPool.push(t);
                }
              },
              "syscall/js.stringVal": (e) => {
                o((e >>>= 0) + 24, a(e + 8));
              },
              "syscall/js.valueGet": (e) => {
                e >>>= 0;
                const t = Reflect.get(n(e + 8), a(e + 16));
                (e = this._inst.exports.getsp() >>> 0), o(e + 32, t);
              },
              "syscall/js.valueSet": (e) => {
                (e >>>= 0), Reflect.set(n(e + 8), a(e + 16), n(e + 32));
              },
              "syscall/js.valueDelete": (e) => {
                (e >>>= 0), Reflect.deleteProperty(n(e + 8), a(e + 16));
              },
              "syscall/js.valueIndex": (e) => {
                o((e >>>= 0) + 24, Reflect.get(n(e + 8), i(e + 16)));
              },
              "syscall/js.valueSetIndex": (e) => {
                (e >>>= 0), Reflect.set(n(e + 8), i(e + 16), n(e + 24));
              },
              "syscall/js.valueCall": (e) => {
                e >>>= 0;
                try {
                  const t = n(e + 8),
                    s = Reflect.get(t, a(e + 16)),
                    i = r(e + 32),
                    l = Reflect.apply(s, t, i);
                  (e = this._inst.exports.getsp() >>> 0),
                    o(e + 56, l),
                    this.mem.setUint8(e + 64, 1);
                } catch (t) {
                  (e = this._inst.exports.getsp() >>> 0),
                    o(e + 56, t),
                    this.mem.setUint8(e + 64, 0);
                }
              },
              "syscall/js.valueInvoke": (e) => {
                e >>>= 0;
                try {
                  const t = n(e + 8),
                    s = r(e + 16),
                    i = Reflect.apply(t, void 0, s);
                  (e = this._inst.exports.getsp() >>> 0),
                    o(e + 40, i),
                    this.mem.setUint8(e + 48, 1);
                } catch (t) {
                  (e = this._inst.exports.getsp() >>> 0),
                    o(e + 40, t),
                    this.mem.setUint8(e + 48, 0);
                }
              },
              "syscall/js.valueNew": (e) => {
                e >>>= 0;
                try {
                  const t = n(e + 8),
                    s = r(e + 16),
                    i = Reflect.construct(t, s);
                  (e = this._inst.exports.getsp() >>> 0),
                    o(e + 40, i),
                    this.mem.setUint8(e + 48, 1);
                } catch (t) {
                  (e = this._inst.exports.getsp() >>> 0),
                    o(e + 40, t),
                    this.mem.setUint8(e + 48, 0);
                }
              },
              "syscall/js.valueLength": (t) => {
                e((t >>>= 0) + 16, parseInt(n(t + 8).length));
              },
              "syscall/js.valuePrepareString": (s) => {
                s >>>= 0;
                const i = t.encode(String(n(s + 8)));
                o(s + 16, i), e(s + 24, i.length);
              },
              "syscall/js.valueLoadString": (e) => {
                const t = n((e >>>= 0) + 8);
                l(e + 16).set(t);
              },
              "syscall/js.valueInstanceOf": (e) => {
                (e >>>= 0),
                  this.mem.setUint8(
                    e + 24,
                    n(e + 8) instanceof n(e + 16) ? 1 : 0
                  );
              },
              "syscall/js.copyBytesToGo": (t) => {
                const s = l((t >>>= 0) + 8),
                  i = n(t + 32);
                if (
                  !(i instanceof Uint8Array || i instanceof Uint8ClampedArray)
                )
                  return void this.mem.setUint8(t + 48, 0);
                const o = i.subarray(0, s.length);
                s.set(o), e(t + 40, o.length), this.mem.setUint8(t + 48, 1);
              },
              "syscall/js.copyBytesToJS": (t) => {
                const s = n((t >>>= 0) + 8),
                  i = l(t + 16);
                if (
                  !(s instanceof Uint8Array || s instanceof Uint8ClampedArray)
                )
                  return void this.mem.setUint8(t + 48, 0);
                const o = i.subarray(0, s.length);
                s.set(o), e(t + 40, o.length), this.mem.setUint8(t + 48, 1);
              },
              debug: (e) => {
                console.log(e);
              },
            },
          };
        }
        async run(e) {
          if (!(e instanceof WebAssembly.Instance))
            throw new Error("Go.run: WebAssembly.Instance expected");
          (this._inst = e),
            (this.mem = new DataView(this._inst.exports.mem.buffer)),
            (this._values = [NaN, 0, null, !0, !1, global, this]),
            (this._goRefCounts = new Array(this._values.length).fill(1 / 0)),
            (this._ids = new Map([
              [0, 1],
              [null, 2],
              [!0, 3],
              [!1, 4],
              [global, 5],
              [this, 6],
            ])),
            (this._idPool = []),
            (this.exited = !1);
          let s = 4096;
          const i = (e) => {
              const i = s,
                n = t.encode(e + "\0");
              return (
                new Uint8Array(this.mem.buffer, s, n.length).set(n),
                (s += n.length),
                s % 8 != 0 && (s += 8 - (s % 8)),
                i
              );
            },
            n = this.argv.length,
            o = [];
          this.argv.forEach((e) => {
            o.push(i(e));
          }),
            o.push(0);
          Object.keys(this.env)
            .sort()
            .forEach((e) => {
              o.push(i(`${e}=${this.env[e]}`));
            }),
            o.push(0);
          const l = s;
          o.forEach((e) => {
            this.mem.setUint32(s, e, !0),
              this.mem.setUint32(s + 4, 0, !0),
              (s += 8);
          });
          if (s >= 12288)
            throw new Error(
              "total length of command line and environment variables exceeds limit"
            );
          this._inst.exports.run(n, l),
            this.exited && this._resolveExitPromise(),
            await this._exitPromise;
        }
        _resume() {
          if (this.exited) throw new Error("Go program has already exited");
          this._inst.exports.resume(),
            this.exited && this._resolveExitPromise();
        }
        _makeFuncWrapper(e) {
          const t = this;
          return function () {
            const s = { id: e, this: this, args: arguments };
            return (t._pendingEvent = s), t._resume(), s.result;
          };
        }
      }),
      "undefined" != typeof module &&
        global.require &&
        global.require.main === module &&
        global.process &&
        global.process.versions &&
        !global.process.versions.electron)
    ) {
      process.argv.length < 3 &&
        (console.error("usage: go_js_wasm_exec [wasm binary] [arguments]"),
        process.exit(1));
      const e = new Go();
      (e.argv = process.argv.slice(2)),
        (e.env = Object.assign(
          { TMPDIR: require("os").tmpdir() },
          process.env
        )),
        (e.exit = process.exit),
        WebAssembly.instantiate(
          fs.readFileSync(process.argv[2]),
          e.importObject
        )
          .then(
            (t) => (
              process.on("exit", (t) => {
                0 !== t ||
                  e.exited ||
                  ((e._pendingEvent = { id: 0 }), e._resume());
              }),
              e.run(t.instance)
            )
          )
          .catch((e) => {
            console.error(e), process.exit(1);
          });
    }
  })();
}
