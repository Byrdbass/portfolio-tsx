# Portfolio-TSX

## resources 
- SVG
  [for SVG as react components](https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent)

### npm issue
- when trying to install react scroll => ran into an error `npm error code EEXIST`
- looked up resource on medium to suggest `npm cache clear --force`
  - I did not add tag `--force`
- ran `npm cache clear`
- then prompt said

      npm error As of npm@5, the npm cache self-heals from corruption issues
      npm error   by treating integrity mismatches as cache misses.  As a result,
      npm error   data extracted from the cache is guaranteed to be valid.  If you
      npm error   want to make sure everything is consistent, use `npm cache verify`
      npm error   instead.  Deleting the cache can only make npm go slower, and is
      npm error   not likely to correct any problems you may be encountering!
      npm error
      npm error   On the other hand, if you're debugging an issue with the installer,
      npm error   or race conditions that depend on the timing of writing to an empty
      npm error   cache, you can use `npm install --cache /tmp/empty-cache` to use a
      npm error   temporary cache instead of nuking the actual one.
      npm error
      npm error   If you're sure you want to delete the entire cache, rerun this command
      npm error   with --force.
      npm error A complete log of this run can be found in: <directory>

- I then ran `npm cache verify` and got this:

      npm error code EACCES
      npm error syscall unlink
      npm error path /Users/ByrdBass/.npm/_cacache/content-v2/sha512/eb/83/ed61a1979e9bd40323c9a7c174c6272cd9aff97408c007bb7d197890b267f6f5049a6d2e2dfe78b3aa03c75b7c5a8cf97f144550b7db45257e22f83755c8
      npm error errno -13
      npm error
      npm error Your cache folder contains root-owned files, due to a bug in
      npm error previous versions of npm which has since been addressed.
      npm error
      npm error To permanently fix this problem, please run:
      npm error   sudo chown -R 501:20 "/Users/ByrdBass/.npm"
      npm error A complete log of this run can be found in:

- then ran ` sudo chown -R 501:20 "/Users/ByrdBass/.npm"`
- then fixed it and could install react-scroll!