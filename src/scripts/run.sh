#!/bin/sh

USAGE="usage: run.sh [user] [repo] [author]"

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "$USAGE" 1>&2
    exit 1
fi

# pwd
# ls -l -a
DIR_NAME="$1-$2-$(date +%s)"

(git clone "https://github.com/$1/$2" "$DIR_NAME" &> /dev/null) || exit 1
# ls -la "$DIR_NAME"
cd "$DIR_NAME" || exit 1
(git ls-files | xargs wc -l) || exit 1
(git log --author="$3" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }') || exit 1
cd ..

rm -r -f "$DIR_NAME" || exit 1

exit 0
