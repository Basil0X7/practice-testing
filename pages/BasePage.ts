import { Page } from '@playwright/test';

export class BasePage {

  // كل صفحة تحتاج إلى page
    constructor(protected page: Page) {}

  // الانتقال لأي رابط
    async goto(path: string = '/') {
        await this.page.goto(path);
    }

  // انتظار تحميل الصفحة بالكامل
    async waitForLoad() {
        await this.page.waitForLoadState('networkidle');
    }

}