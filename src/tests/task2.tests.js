describe('task 2', () => {
    before(async() => {
        await browser.url("https://pastebin.com")
        await $('a.sign-in').click()
        await $('input#loginform-username').setValue('Epam-user')
        await $('input#loginform-password').setValue('epam_test_12345')
        await $('button.btn').click()
    })
    it('creating new paste with bash style', async () => {
        await $('a.header__btn').click()
        await $('textarea#postform-text').setValue(`
            git config --global user.name  "New Sheriff in Town"
            git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
            git push origin master --force`)
        await $('input#postform-name').setValue('how to gain dominance among developers')
        await $('span#select2-postform-format-container').click()
        await $('//li[contains(text(),"Bash")]').click()
        await $('span#select2-postform-expiration-container').click()
        await $('//li[contains(text(),"10 Minutes")]').click()
        await $('.-big').scrollIntoView()
        await $('.-big').click()
    
        expect(await browser).toHaveTitle('how to gain dominance among developers')
        expect(await $('div.source').getAttribute('class')).toEqual('source bash')
        expect(await $('div.source').getText()).toHaveText(`
            git config --global user.name  "New Sheriff in Town"
            git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
            git push origin master --force`)
        })
    })