import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './types';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllAccounts(@Request() req) {
    return this.accountsService.getAccounts();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getAccount(@Param('id') id: string) {
    return this.accountsService.getAccount(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createAccount(@Body() postData: Account) {
    return this.accountsService.createAccount(postData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateAccount(@Param('id') id: string, @Body() postData: Account) {
    return this.accountsService.updateAccount(Number(id), postData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patchAccount(@Param('id') id: string, @Body() postData: Account) {
    return this.accountsService.patchAccount(Number(id), postData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteAccount(@Param('id') id: string) {
    return this.accountsService.deleteAccount(Number(id));
  }
}
