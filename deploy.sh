npm run docs:build

cd docs/.vuepress/dist

echo 'git.zhangxiaojuan.club' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:zxjzx/zxjzx.github.io.git master
