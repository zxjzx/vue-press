npm run docs:build

cd docs/.vuepress/dist

echo 'git.zhangxiaojuan.club' > CNAME
echo '# 我的个人网站[链接](https://git.zhangxiaojuan.club/)' > README.md

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:zxjzx/zxjzx.github.io.git master

# cd docs
# treer -e tree.txt -i "/.vuepress/"
# cd .vuepress
# treer -e tree.txt -i "/dist/"


