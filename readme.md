# Terminal (Term.ts)

## Index

- [What is it](#what_is_it)
- [Why do i do it](#why_do_i_do_it)
- [Compilation](#compilation)
- [Use](#use)
- [Commands](#commands)
- [Dependencies](#dependencies)

### What is it

Term is a terminal, which tries to be intuitive, easy on the eye and easy to use.

### Why do i do it

Because it's fun

### Compilation

To compile the project you need to have Deno installed on your machine, if you have it use the following command

`deno compile --unstable --allow-run --allow-read --allow-write --allow-net --output=dist/term source/main.ts`

### Use

To use term you only need to call the executable, if you have used bash before it will look familiar.

`cd dist`

`term`

```
<Actual Folder> <User> <Location>
$ <your command> <arguments if necessary>
```

### Commands

Term currently has 6 commands or more, depending on how much you update the readme

- **cd** `<Folder>`
- **show** `<Info>`
- **read** `<File> <Each>` if it has no arguments it will read the current directory
- **clear**
- **exit**
- **servis**

### Dependencies

- [Oak](https://deno.land/x/oak@v10.2.1/mod.ts)
- [Std Colors](https://deno.land/std@0.128.0/fmt/colors.ts)
- [Std Flags](https://deno.land/std@0.128.0/flags/mod.ts)
- [Case](https://deno.land/x/case@v2.1.0/mod.ts)
- [Std Path](https://deno.land/std@0.128.0/path/mod.ts)
- [Std Fs](https://deno.land/std@0.128.0/fs/mod.ts)
- [Std Asserts](https://deno.land/std@0.128.0/testing/asserts.ts)